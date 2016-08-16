select products.id, products.name, count_in_2014, isnull(count_in_2015, 0) as count_in_2015
from (select products.id, count(*) as count_in_2014
		from orders_products
		join orders
		on orders_products.order_id = orders.id
		join products
		on orders_products.product_id = products.id
		where orders.date >= '2014-01-01' and orders.date < '2014-12-31' group by products.id) as sales2014
left join (select products.id, count(*) as count_in_2015
		from orders_products
		join orders
		on orders_products.order_id = orders.id
		join products
		on orders_products.product_id = products.id
		where orders.date >= '2015-01-01' and orders.date < '2015-12-31' group by products.id) as sales2015
on sales2015.id = sales2014.id
join products
on sales2014.id = products.id
where (count_in_2015 is null) or (count_in_2014 > count_in_2015)
order by products.name