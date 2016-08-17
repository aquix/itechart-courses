if object_id('calc_count_of_sales_in_interval') is not null
  drop function calc_count_of_sales_in_interval
go

create function calc_count_of_sales_in_interval(@interval_start datetime, @interval_end datetime)
returns table
as return
	select sold_ids.id, count(*) as count_of_sales
	from (select products.id as id
		from orders_products
		join orders
		on orders_products.order_id = orders.id
		join products
		on orders_products.product_id = products.id
		where orders.date between @interval_start and @interval_end) as sold_ids
	group by sold_ids.id
go

select products.id,
	   products.name,
	   sales2014.count_of_sales as count_in_2014,
	   isnull(sales2015.count_of_sales, 0) as count_in_2015
from calc_count_of_sales_in_interval('2014-01-01', '2014-12-31') as sales2014
left join calc_count_of_sales_in_interval('2015-01-01', '2015-12-31') as sales2015
on sales2015.id = sales2014.id
join products
on sales2014.id = products.id
where (sales2015.count_of_sales is null) or (sales2014.count_of_sales > sales2015.count_of_sales)
order by products.name