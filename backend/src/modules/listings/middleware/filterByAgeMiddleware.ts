import { Request, Response, NextFunction } from 'express';

declare module 'express' {
  interface Request {
    filteredPersons?: Person[];
  }
}

interface Person {
  id: number;
  name: string;
  age: number;
}

const generateName = (): string => {
  const names: string[] = ['Nikhil','Sandy','Harry','Aman','Akash'];
  const randomIndex: number = Math.floor(Math.random() * 5);
  return names[randomIndex];
};

const generatePersons = (count: number): Person[] => {
  const persons: Person[] = [];
  for (let i = 0; i < count; i++) {
    const id: number = Math.floor(Math.random() * 1000);
    const name: string = generateName();
    const age: number = Math.floor(Math.random() * 50) + 1; 
    persons.push({
      id: id,
      name: name,
      age: age,
    });
  }
  return persons;
};

export const filterByAgeMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const requestedAge: any = req.query.age
  if (!requestedAge) {
    res.status(400).json({ error: 'Please pass age in query' });
  }
  if (isNaN(requestedAge) || requestedAge <= 0) {
    res.status(400).json({ error: 'Plese pass valid age and age should be a number' });
  }
  const personsCount: number = 5; 
  const persons: Person[] = generatePersons(personsCount);
  console.log(persons)
  const resPersons: Person[] = persons.filter((person) => person.age > requestedAge);
  req.filteredPersons = resPersons; 
  next();
};
