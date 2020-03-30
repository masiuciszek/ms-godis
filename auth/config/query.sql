CREATE TABLE companies
(
  id INTEGER
  AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR
  (100),

);


  create table candies
  (
    id INTEGER
    AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR
    (100),
    price INT,
    company_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW
    (),
    FOREIGN KEY
    (company_id) REFERENCES companies
    (id) ON
    DELETE CASCADE
);



    INSERT INTO companies
      (name)
    VALUES
      ("cloetta"),
      ("harbiou"),
      ("maloco"),
      ("fererer"),
      ("lindt");


    INSERT INTO candies
      (name,company_id)
    VALUES
      ("daim", 1),
      ("marabou", 3),
      ("skumtomte", 2),
      ("hallon bat", 2),
      ("zoo klubba", 4),
      ("kokos boll", 2),
      ("lakrits bat", 1);