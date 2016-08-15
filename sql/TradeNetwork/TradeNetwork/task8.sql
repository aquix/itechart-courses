select shops.name, sum(orders.amount)
from orders
join shops
on orders.shop_id = shops.id
where orders.date >= '2015-01-01' and orders.date < '2015-12-31'
group by shops.id, shops.name
order by shops.name