import people from './data/theyvoteforyou/people.json' assert { type: 'json' }

console.log(people.filter(v=> v.id == '10940')[0])