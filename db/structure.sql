CREATE TABLE Users (
  Id            serial,
  Name          varchar(64) NOT NULL,
  Password      varchar(255) NOT NULL,
  Token         text,
  Email         text UNIQUE NOT NULL,
  Type          varchar(10) NOT NULL
);

ALTER TABLE Users ADD CONSTRAINT pkUsers PRIMARY KEY (Id);

CREATE UNIQUE INDEX akUsersEmail ON Users (Email);

CREATE TABLE PetOwners (
  Id            serial,
  Phone         varchar(12),
  Description   varchar(256),
  Location      varchar(256),
  Whome         varchar(256),
  Age           integer,
  UserId        integer NOT NULL
);

ALTER TABLE PetOwners ADD CONSTRAINT pkPetOwners PRIMARY KEY (Id);

ALTER TABLE PetOwners ADD CONSTRAINT fkPetOwnersUserId FOREIGN KEY (UserId) REFERENCES Users (Id) ON DELETE CASCADE;


CREATE TABLE PetFinders (
  Id            serial,
  Phone         varchar(12),
  Description   varchar(256),
  Location      varchar(256),
  Whome         varchar(256),
  Age           integer,
  UserId        integer NOT NULL
);

ALTER TABLE PetFinders ADD CONSTRAINT pkPetFinders PRIMARY KEY (Id);

ALTER TABLE PetFinders ADD CONSTRAINT fkPetFindersUserId FOREIGN KEY (UserId) REFERENCES Users (Id) ON DELETE CASCADE;

CREATE TABLE Dialogs (
  Id        serial,
  User1     varchar(256) NOT NULL,
  User2     varchar(256) NOT NULL
);

ALTER TABLE Dialogs ADD CONSTRAINT fkDialogsUser1 FOREIGN KEY (User1) REFERENCES Users (Email) ON DELETE CASCADE;
ALTER TABLE Dialogs ADD CONSTRAINT fkDialogsUser2 FOREIGN KEY (User2) REFERENCES Users (Email) ON DELETE CASCADE;
ALTER TABLE Dialogs ADD CONSTRAINT pkDialogs PRIMARY KEY (Id);

CREATE TABLE Messages (
  Id        serial,
  User1     text NOT NULL,
  DialogId  integer NOT NULL,
  Content   text NOT NULL,
  CreatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE Messages ADD CONSTRAINT fkMessageUsers1 FOREIGN KEY (User1) REFERENCES Users (Email) ON DELETE CASCADE;
ALTER TABLE Messages ADD CONSTRAINT fkMessageDialogsId FOREIGN KEY (DialogId) REFERENCES Dialogs (Id) ON DELETE CASCADE;

CREATE TABLE Pets (
  Id            serial,
  Alias         varchar(256),
  Type          varchar(50),
  Species       varchar(256),
  Description   text,
  Age           varchar(256),
  Sex           varchar(10),
  OwnerEmail    text UNIQUE NOT NULL
);

ALTER TABLE Pets ADD CONSTRAINT fkPetsOwnerEmail FOREIGN KEY (OwnerEmail) REFERENCES Users (Email) ON DELETE CASCADE;

ALTER TABLE Pets ADD CONSTRAINT pkPets PRIMARY KEY (Id);
