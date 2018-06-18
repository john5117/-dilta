/**
 * THIS MODULE DESCRIBES THE RANDOM DATA GENERATOR
 * FOR THE CHART GRAPH TO HAVE PREDESITINE VALUE
 */

import * as faker from 'faker';
import { examList, Score, select, list } from './../../gen.faker';
import * as fs from 'fs';

/**
 * students name allowed to be generated for tessting
 */
const students = [
  'Amani Ziemann',
  `Aryanna O'Conner`,
  'Ashly Schaefer',
  'Vilma Barrows Jr.',
  'Eveline Huels II',
  'Otto Kling',
  'Dr. Ewell Walsh',
  'Fredrick Lakin',
  'Ed Boyer',
  'Olaf Glover',
  'Isobel Rohan MD',
  'Frederic Morar',
  'Carleton Stokes DVM',
  'Karine Prohaska',
  'Darren Goldner',
  'Eryn Rosenbaum',
  'Jacinthe Pouros',
  'Marianna Raynor',
  'Dr. Patience Monahan',
  'Kellie Sauer',
  'Fritz Cummings I',
  'Emerson Ortiz',
  'Nona Rice',
  'Edmond Gulgowski III',
  'Mrs. Eliseo Weber'
];

/**
 * gerenates data from the acceptable names allowed
 * so has to have a valid testing
 *
 * @returns {Score} an exam score object
 */
function scoreGen(): Score {
  return {
    class: select([
      'pry1',
      'pry2',
      'pry3',
      'pry4',
      'pry5',
      'pry6',
      'nus1',
      'nus2',
      'nus3'
    ]) as any,
    subject: select([
      'english',
      'chemistry',
      'biology',
      'mathematics',
      'physics',
      'economics',
      'geography',
      'government',
      'literature'
    ]) as any,
    b_id: faker.random.uuid(),
    name: select(students) as any,
    fa: faker.random.number({ min: 0, max: 30 }),
    sa: faker.random.number({ min: 0, max: 30 }),
    exam: faker.random.number({ min: 0, max: 70 }),
    id: faker.random.uuid(),
    session: select(['2016/2017', '2018/2019', '2015/2016']) as any,
    term: select(['first term', 'second term', 'third term']) as any
  };
}

/**
 * generates an array of certain numbers for predetermined values
 *
 * @param {number} [no=5] the amoun of array items to generate
 */
export const scoresList = (no = 5) => list<Score>(scoreGen, no);

fs.writeFileSync(
  './src/app/utils/chart/data.json',
  JSON.stringify(scoresList(150))
);
