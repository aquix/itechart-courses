select *
from orders_products
join orders
on orders_products.order_id = orders.id
join products
on orders_products.product_id = products.id

-- TODO