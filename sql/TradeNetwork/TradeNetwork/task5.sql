select distinct products.name
from orders_products
join orders
on orders_products.order_id = orders.id
join products
on orders_products.product_id = products.id
where orders.date >= '2015-01-01' and orders.date < '2015-12-31'
order by products.name