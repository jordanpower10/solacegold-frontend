-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create wallets table if it doesn't exist
create table if not exists wallets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) not null,
  wallet_type text not null check (wallet_type in ('cash', 'gold')),
  balance decimal default 0 not null check (balance >= 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, wallet_type)
);

-- Create transactions table if it doesn't exist
create table if not exists transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) not null,
  type text not null check (type in ('deposit', 'withdraw', 'buy_gold', 'sell_gold')),
  amount decimal not null,
  gold_amount decimal,
  gold_price decimal,
  status text default 'completed' not null check (status in ('pending', 'completed', 'failed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create trigger to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Add triggers to tables
drop trigger if exists update_wallets_updated_at on wallets;
create trigger update_wallets_updated_at
  before update on wallets
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_transactions_updated_at on transactions;
create trigger update_transactions_updated_at
  before update on transactions
  for each row
  execute function update_updated_at_column();

-- Create function to initialize user wallets
create or replace function initialize_user_wallets()
returns trigger as $$
begin
  -- Create cash wallet
  insert into wallets (user_id, wallet_type, balance)
  values (new.id, 'cash', 0);
  
  -- Create gold wallet
  insert into wallets (user_id, wallet_type, balance)
  values (new.id, 'gold', 0);
  
  return new;
end;
$$ language plpgsql security definer;

-- Add trigger to create wallets for new users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function initialize_user_wallets();

-- Create buy_gold function
create or replace function buy_gold(
  p_user_id uuid,
  p_gold_amount decimal,
  p_gold_price decimal
)
returns void
language plpgsql
security definer
as $$
declare
  v_cash_balance decimal;
  v_total_cost decimal;
begin
  -- Calculate total cost
  v_total_cost := p_gold_amount * p_gold_price;
  
  -- Get current cash balance
  select balance into v_cash_balance
  from wallets
  where user_id = p_user_id and wallet_type = 'cash';
  
  -- Check if user has enough cash
  if v_cash_balance < v_total_cost then
    raise exception 'Insufficient cash balance';
  end if;
  
  -- Start transaction
  begin
    -- Deduct cash
    update wallets
    set balance = balance - v_total_cost
    where user_id = p_user_id and wallet_type = 'cash';
    
    -- Add gold
    update wallets
    set balance = balance + p_gold_amount
    where user_id = p_user_id and wallet_type = 'gold';
    
    -- Record transaction
    insert into transactions (
      user_id,
      type,
      amount,
      gold_amount,
      gold_price
    ) values (
      p_user_id,
      'buy_gold',
      v_total_cost,
      p_gold_amount,
      p_gold_price
    );
  exception
    when others then
      raise exception 'Failed to process gold purchase: %', sqlerrm;
  end;
end;
$$;

-- Create sell_gold function
create or replace function sell_gold(
  p_user_id uuid,
  p_gold_amount decimal,
  p_gold_price decimal
)
returns void
language plpgsql
security definer
as $$
declare
  v_gold_balance decimal;
  v_total_value decimal;
begin
  -- Calculate total value
  v_total_value := p_gold_amount * p_gold_price;
  
  -- Get current gold balance
  select balance into v_gold_balance
  from wallets
  where user_id = p_user_id and wallet_type = 'gold';
  
  -- Check if user has enough gold
  if v_gold_balance < p_gold_amount then
    raise exception 'Insufficient gold balance';
  end if;
  
  -- Start transaction
  begin
    -- Deduct gold
    update wallets
    set balance = balance - p_gold_amount
    where user_id = p_user_id and wallet_type = 'gold';
    
    -- Add cash
    update wallets
    set balance = balance + v_total_value
    where user_id = p_user_id and wallet_type = 'cash';
    
    -- Record transaction
    insert into transactions (
      user_id,
      type,
      amount,
      gold_amount,
      gold_price
    ) values (
      p_user_id,
      'sell_gold',
      v_total_value,
      p_gold_amount,
      p_gold_price
    );
  exception
    when others then
      raise exception 'Failed to process gold sale: %', sqlerrm;
  end;
end;
$$;

-- Set up Row Level Security (RLS)
-- Enable RLS on tables
alter table wallets enable row level security;
alter table transactions enable row level security;

-- Create policies for wallets
create policy "Users can view their own wallets"
  on wallets for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can update their own wallets through functions"
  on wallets for update
  to authenticated
  using (auth.uid() = user_id);

-- Create policies for transactions
create policy "Users can view their own transactions"
  on transactions for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own transactions through functions"
  on transactions for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Grant necessary permissions to authenticated users
grant usage on schema public to authenticated;
grant select on wallets to authenticated;
grant select on transactions to authenticated;
grant execute on function buy_gold to authenticated;
grant execute on function sell_gold to authenticated; 