import { Orange } from './Orange';
import { Apple } from './Apple';

const orange = new Orange();

orange.color = 'purple';
orange.shape = 'route';
orange.isPeeled = true;

console.log(orange);

const apple = new Apple();

apple.color = 'red';
apple.genre = [ 'fuji', 'gala', 'honeycrisp' ];
apple.texture = [ 'mealy', 'mushy', 'crisp', 'soggy', 'fresh' ];

console.log(apple);

