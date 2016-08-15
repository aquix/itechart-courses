-- Calculates not in Jan 2015 but in whole 2015 year
select avg(price)
from orders
where date >= '2015-01-01' and date < '2015-12-31';