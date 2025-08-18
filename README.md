# Ru Jiao (Confucianism)

**Education for all**

```
If you can one day renovate yourself, do so from day to day.
Yea, let there be daily renovation..
~Da Xue III:4
```

## Configuration
1. Environments

| environment | description | example |
|--|--|--|
| VITE_PORT | vite development port | 551 |
| VITE_PREVIEW_PORT | vite preview port (used for `npm run preview`) | 479 |
| VITE_PUBLIC_URL | application url without end slashes | https://rujiaooo.github.io |
| VITE_API_HOST | api host url without end slashes | https://rujiaooo.github.io |
| VITE_GOOGLE_ANALYTICS_ID | google analytic/tag manager id | GA-23XYZ |
| VITE_TAWK_PROPERTY_ID | tawk property id | 0109ldid91uf01ur8918 |
| VITE_TAWK_WIDGET_ID | tawk widget id | 109fja92 |

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
1. Thumbnail generator for each pages (integrate with sitemap)
2. Search on submit not on change (show default search result on search page instead of empty)
3. Multilingual page detail view
4. Preview page (book, music, etc)
5. Enhance music filter
- multiple firstChar
- removeable firstChar
6. Add media ([medium](https://medium.com) or [discourse](https://github.com/discourse/discourse))
7. Add book: Yi Jing
8. Add book: Chun Qiu Jing
9. Add prayer letter

## Nice to Have
Nothing to have right now

## Issues
No issues right now

## Notes
1. Lun Yu difference

Lun Yu X (Xiang Dang)
https://ctext.org/analects/xiang-dang

Ctext = 18
Matakin = 27
Wengu Zhixin = 27

2. Continue Shu Jing XXI:1

## References:
1. [MATAKIN](https://matakin.or.id/)
2. [Chinese Text](https://ctext.org/)
3. [Wengu Zhixin](http://wengu.tartarie.com/wg/wengu.php)
