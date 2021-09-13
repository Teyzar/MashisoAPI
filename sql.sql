create table Menu (
    MenuID int(3) zerofill not null auto_increment,
    CategoryID int(11),
    Menu varchar(255),
    Price decimal(9,2),
    Primary key (MenuID, CategoryID)
);

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
    ('Fries'),
    ('Mandu'),
    ('Special dish');


insert into 
    Menu (CategoryID, Menu, Price) 
values
    ('1','Plain','350'),
    ('1','Bulgogi','380'),
    ('1','Spicy','390'),
    ('1','100g chicken fillet','400');

ALTER TABLE Menu AUTO_INCREMENT=000;

create table Order_List (
    OrderId int(11) auto_increment, 
    MenuID int(3),
    item text,
    quantity int(11),
    Price decimal(9,2),
    Primary key (OrderId, MenuID)
);
create table Order_List as 
(select menu from Menu where menu_id = 101), OrderId int(11) auto_increment;

create table Order_List (
    OrderId int(11) auto_increment, 
    MenuID int(3),
    quantity int(11),
    Primary key (OrderId, MenuID)
);


SELECT Order_List.OrderId, Order_List.MenuID, Menu.menu as Item, Order_List.quantity, Menu.price from Order_List Inner JOIN Menu on Order_List.MenuID=Menu.menu_id;

SELECT Order_List.OrderId, Order_List.MenuID from Order_List