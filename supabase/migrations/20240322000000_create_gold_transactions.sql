-- Create functions for buying and selling gold
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

-- Add RLS policies for the functions
alter function buy_gold(uuid, decimal, decimal) set rls_enabled = true;
alter function sell_gold(uuid, decimal, decimal) set rls_enabled = true;

-- Add new columns to transactions table if they don't exist
alter table transactions 
add column if not exists gold_amount decimal,
add column if not exists gold_price decimal; 