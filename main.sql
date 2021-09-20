create table Category (
    CategoryID int(11) auto_increment,
    CategoryName varchar(255),
    Primary key (CategoryID)
);

insert into 
    Category (CategoryName) 
    values 
    ('Samgyupsal'),
    ('Set meal'),
    ('Chicken'),
    ('Pulutan'),
    ('Sandwiches'),
    ('Fries'),
    ('Mandu'),
    ('Special dish'),
    ('Rice Meal');

insert into 
    Menu (CategoryID, Menu, Price) 
values
    ('1','Plain','350'),
    ('1','Bulgogi','380'),
    ('1','Spicy','390'),
    ('1','100g chicken fillet','400');


SELECT Order_List.OrderId, Order_List.MenuID from Order_List

Create table transaction_orders (
    id int(11) auto_increment,
    transaction_id int(11),
    (SELECT menu_id FROM menu),
    quantity int(11),
    Primary key (id, menu_id)
);

CREATE TABLE transaction_table (
    id int(11) auto_increment,
    transaction_id int(11),
    menu_id int(3),
    quantity int(11),
    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    Primary key (id, menu_id)
);




create table Menu(
    menu_id int(3) auto_increment,
    category_id int(1),
    menu text,
    price decimal(9,2),
    primary key(menu_id)
);

-- 101 ~ 
insert into Menu(
	menu_id,
    category_id,
    menu,
    price
)
values
(101,1,"Plain",350);

insert into Menu(
    category_id,
    menu,
    price
)
values
(1,"Bulgogi",380),
(1,"Spicy",390),
(1,"100g Chicken fillet",400);


-- change menu_Id to 201
insert into Menu(
    menu_id,
    category_id,
    menu,
    price
)
values
(201,2,"Beef bulgogi",499);


-- insert data
insert into Menu(
    category_id,
    menu,
    price
)
values
(2,"Jeyuk bokkuem",450),
(2,"Kamja tang",599),
(2,"Pork kalbi jjim",499);

-- change to 301
insert into Menu(
    menu_id,
    category_id,
    menu,
    price
)
values
(301,3,"Spicy chicken wings",185);

-- insert data
insert into Menu(
    category_id,
    menu,
    price
)
values
(3,"Fried chicken neck",95),
(3,"Fried chicken bucket",340),
(3,"Spicy fried chicken bucket",380),
(3,"Fried chicken skin",11);

-- change into 401
insert into Menu(
    menu_id,
    category_id,
    menu,
    price
)
values
(401,4,"Gizzard fried",95);

-- insert DATA
insert into Menu(
    category_id,
    menu,
    price
)
values
(4,"Gizzard spicy",120),
(4,"Chicken feet spicy",120);

-- change into 501
insert into Menu(
    menu_id,
    category_id,
    menu,
    price
)
values
(501,5,"Thigh",120);

-- insert DATA
insert into Menu(
    category_id,
    menu,
    price
)
values
(5,"Ham & egg",88),
(5,"Egg salad",88),
(5,"Tuna mayo",99),
(5,"Chicken salad",99);

-- change into 601
insert into Menu(
    menu_id,
    category_id,
    menu,
    price
)
values
(601,6,"Squid ring", 190);

-- insert DATA
insert into Menu(
    category_id,
    menu,
    price
)
values
(6,"Kropek",55),
(6,"Potato fries",65),
(6,"Cheese sticks",50),
(6,"Dynamite",90),
(6,"Lumpia",90),
(6,"Combo fries",240),
(6,"Nachos & fries",140);

-- change into 701
insert into Menu(
    menu_id,
    category_id,
    menu,
    price
)
values
(701,7,"Kimchi",100);

-- insert DATA
insert into Menu(
    category_id,
    menu,
    price
)
values
(7,"Pork & veggies",100),
(7,"Chicken & veggies",100),
(7,"No meat",100),
(7,"Add on",25);

-- change into 801
insert into Menu(
	menu_id,
    category_id,
    menu,
    price
)
values
(801,8,	"Jjajangmyun chicken",	200);

insert into Menu(
    category_id,
    menu,
    price
)
values
(8,	"Jjajangmyun seafood",	220),
(8,	"Jjampong",	220),
(8,	"fish cake",	110),
(8,	"Japchae",	165),
(8,	"Omoktang",	132),
(8,	"Tuna jumokbap",	100),
(8,	"Kimchi jumokbap",	100),
(8,	"Eggroll",	110),
(8,	"Tangsuyok",	190),
(8,	"Rice",	30),
(8,	"Kimchi",	150);

-- change into 901
insert into Menu(
    menu_id,
    category_id,
    menu,
    price
)
values
(901,	9,	"Bulgogi",	139);

-- insert data
insert into Menu(
    category_id, 
    menu,
    price
)
values
(9,	"Wang donkass",	150),
(9,	"Chickenkass",	140),
(9,	"Spicy porkstew",	185),
(9,	"Sweet spicy squid",	195),
(9,	"Grilled pork belly",	195),
(9,	"Grilled chicken fillet",	175),
(9,	"Tak tori tang",	185),
(9,	"Meatballs",	110),
(9,	"Spicy wings",	140),
(9,	"Fried chicken spicy sauce",	190),
(9,	"Fried porkchop",	140),
(9,	"Spicy chicken fillet",	165),
(9,	"Fried chicken fillet",	140);
