create function calc_count_of_sales_in_interval(@interval_start nvarchar(10), @interval_end nvarchar(10))
returns @ret table
	(id int primary key,
	 count int)
as
begin
	declare @sales_table table (id int);
	set @sales_table = (select products.id
		from orders_products
		join orders
		on orders_products.order_id = orders.id
		join products
		on orders_products.product_id = products.id
		where orders.date >= @interval_start and orders.date < @interval_end);

	select @ret = (select id, count(*) as count
		from @sales_table
		group by id)
	return
end;

select *
from calc_count_of_sales_in_interval('2015-01-01', '2015-12-31') as sales2015
join calc_count_of_sales_in_interval('2014-01-01', '2014-12-31') as sales2014
on sales2015.id = sales2014.id

-- TODO