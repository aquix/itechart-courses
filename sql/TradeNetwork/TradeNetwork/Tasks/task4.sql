select name, price
from products
where price = (
	select max(price)
	from products
)