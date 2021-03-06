﻿select shops.name, sum(orders.amount) as amount
from orders
join shops
on orders.shop_id = shops.id
where orders.date between '2015-01-01' and '2015-12-31'
group by shops.id, shops.name
order by amount