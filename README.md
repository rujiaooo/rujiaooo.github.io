# ConfuciusID

**Education for all**

> _Carilah dan engkau akan mendapatkannya. Sia-siakanlah dan engkau akan kehilangan._
> _Inilah mencari yang berfaedah untuk didapatkan dan carilah itu di dalam diri._
> _~Meng Zi VII A:3.1_

## Configuration
1. Environments

| environment | description | example |
|--|--|--|
| VITE_PORT | vite development port | 551 |
| VITE_PREVIEW_PORT | vite preview port (used for `npm run preview`) | 479 |
| VITE_PUBLIC_URL | application url without end slashes | https://confucius.github.io |
| VITE_API_HOST | api host url without end slashes | https://confucius.github.io |
| VITE_GOOGLE_ANALYTICS_ID | google analytic/tag manager id | GA-23XYZ |

## Development
### Starting the app
1. Install the dependencies: `npm install` (as needed)
2. Setup the environment config: `cp .env.example .env`
3. Run the app: `npm start`
4. Check on: `localhost:551`

## Deployment
### Setup
1. Install the dependencies: `npm install` (as needed)
2. Setup the environment config: `cp .env.example .env`
3. Build the app: 
- `npm run deploy:dev` (dev deployment)
- `npm run deploy:prod` (prod deployment)
4. Setup the server to host the build folder:
- `/build` (original build)
- `/snap-build` (prerender build)

## Todos
1. Add navigation
2. Search content
3. Multilingual page detail view
4. Highlight view
- click highlight
- single hash highlight
5. Preview page (book, music, etc)
6. Chat tawk.to

## Nice to Have
Nothing to have right now

## Issues
No issues right now

## References:
1. [MATAKIN](https://matakin.or.id/)
2. [Chinese Text](https://ctext.org/)
3. [Wengu zhixin](http://wengu.tartarie.com/wg/wengu.php)
