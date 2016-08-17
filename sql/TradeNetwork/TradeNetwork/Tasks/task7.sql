select shops.name, avg(products.price)
from shops_products
join shops
on shops_products.shop_id = shops.id
join products
on shops_products.product_id = products.id
group by shops.name