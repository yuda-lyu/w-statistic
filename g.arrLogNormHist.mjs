import arrLogNormHist from './src/arrLogNormHist.mjs'
// import fs from 'fs'
// import w from 'wsemi'

async function test() {

    let arr
    let r

    arr = [13.8, 19.5, 16.7, 14.3, 17.5, 14.5, 12.6, 15.6, 8.9, 13.3, 17.1, 15, 16.3, 18.3, 18.7, 16.7, 20.9, 12.3, 22.3, 14.6, 20.1, 16.7, 16.8, 24.2, 21.2, 20.7, 18.6, 18.3, 15.9, 17.2, 18.8, 16.3, 20.5, 14.7, 17.5, 24.1, 14.6, 21.1, 17, 19.6, 21.2, 16, 16.5, 9.3, 16.2, 14.9, 16.3, 13.9, 18.4, 19.2, 24.6, 20.2, 12.8, 12.9, 14.1, 18.5, 13.4, 17.1, 9.9, 21.9, 19.6, 18.3, 19.7, 16.6, 21.7, 11.8, 15.9, 11.4, 14.3, 17.4, 16.4, 20.7, 18.6, 22, 17.9, 16.3, 15.4, 17.2, 17.3, 18.3, 16.8, 20.9, 15, 15.1, 18.6, 17.5, 14.7, 17.4, 13.8, 18.3, 17.2, 13.4, 12.5, 22.8, 18.6, 16.3, 16.1, 15.7, 20.8, 16.4]
    r = await arrLogNormHist(arr, {
        n: 10,
        min: 12,
        max: 23,
    })
    console.log(r)
    // => {
    //   avg: 17.048000000000002,
    //   std: 3.1686749612576244,
    //   avg_geo: 16.741131283482233,
    //   avg_log: 2.817868642436364,
    //   std_log: 0.19557811714294832,
    //   arr: [
    //     13.8, 19.5, 16.7, 14.3, 17.5, 14.5, 12.6, 15.6,  8.9, 13.3,
    //     17.1,   15, 16.3, 18.3, 18.7, 16.7, 20.9, 12.3, 22.3, 14.6,
    //     20.1, 16.7, 16.8, 24.2, 21.2, 20.7, 18.6, 18.3, 15.9, 17.2,
    //     18.8, 16.3, 20.5, 14.7, 17.5, 24.1, 14.6, 21.1,   17, 19.6,
    //     21.2,   16, 16.5,  9.3, 16.2, 14.9, 16.3, 13.9, 18.4, 19.2,
    //     24.6, 20.2, 12.8, 12.9, 14.1, 18.5, 13.4, 17.1,  9.9, 21.9,
    //     19.6, 18.3, 19.7, 16.6, 21.7, 11.8, 15.9, 11.4, 14.3, 17.4,
    //     16.4, 20.7, 18.6,   22, 17.9, 16.3, 15.4, 17.2, 17.3, 18.3,
    //     16.8, 20.9,   15, 15.1, 18.6, 17.5, 14.7, 17.4, 13.8, 18.3,
    //     17.2, 13.4, 12.5, 22.8, 18.6, 16.3, 16.1, 15.7, 20.8, 16.4
    //   ],
    //   min: 12,
    //   max: 23.000000000000007,
    //   barWidth: 1.0999999999999996,
    //   ratioForCountToPdf: 0.00988142292490119,
    //   bins: [
    //     {
    //       min: 12,
    //       max: 13.1,
    //       avg: 12.55,
    //       arr: [Array],
    //       counts: 5,
    //       pdf: 0.04940711462450595
    //     },
    //     {
    //       min: 13.1,
    //       max: 14.2,
    //       avg: 13.649999999999999,
    //       arr: [Array],
    //       counts: 7,
    //       pdf: 0.06916996047430833
    //     },
    //     {
    //       min: 14.2,
    //       max: 15.299999999999999,
    //       avg: 14.75,
    //       arr: [Array],
    //       counts: 11,
    //       pdf: 0.10869565217391308
    //     },
    //     {
    //       min: 15.299999999999999,
    //       max: 16.4,
    //       avg: 15.849999999999998,
    //       arr: [Array],
    //       counts: 15,
    //       pdf: 0.14822134387351785
    //     },
    //     {
    //       min: 16.4,
    //       max: 17.5,
    //       avg: 16.95,
    //       arr: [Array],
    //       counts: 19,
    //       pdf: 0.1877470355731226
    //     },
    //     {
    //       min: 17.5,
    //       max: 18.6,
    //       avg: 18.05,
    //       arr: [Array],
    //       counts: 12,
    //       pdf: 0.11857707509881428
    //     },
    //     {
    //       min: 18.6,
    //       max: 19.700000000000003,
    //       avg: 19.150000000000002,
    //       arr: [Array],
    //       counts: 7,
    //       pdf: 0.06916996047430833
    //     },
    //     {
    //       min: 19.700000000000003,
    //       max: 20.800000000000004,
    //       avg: 20.250000000000004,
    //       arr: [Array],
    //       counts: 6,
    //       pdf: 0.05928853754940714
    //     },
    //     {
    //       min: 20.800000000000004,
    //       max: 21.900000000000006,
    //       avg: 21.350000000000005,
    //       arr: [Array],
    //       counts: 7,
    //       pdf: 0.06916996047430833
    //     },
    //     {
    //       min: 21.900000000000006,
    //       max: 23.000000000000007,
    //       avg: 22.450000000000006,
    //       arr: [Array],
    //       counts: 3,
    //       pdf: 0.02964426877470357
    //     }
    //   ],
    //   curves: [
    //     { x: 8.9, pdf: 0.0003700715564882641 },
    //     { x: 8.990947415368343, pdf: 0.0004371517692405818 },
    //     { x: 9.082824205159403, pdf: 0.0005149975464899293 },
    //     { x: 9.17563986647449, pdf: 0.0006050683906353664 },
    //     { x: 9.269403993463994, pdf: 0.0007089737523706667 },
    //     { x: 9.36412627831911, pdf: 0.0008284803923579783 },
    //     { x: 9.459816512273708, pdf: 0.0009655187182904854 },
    //     { x: 9.556484586616412, pdf: 0.001122187810647756 },
    //     { x: 9.65414049371306, pdf: 0.0013007588285175362 },
    //     { x: 9.752794328039583, pdf: 0.0015036764684296378 },
    //     { x: 9.852456287225452, pdf: 0.0017335581352873786 },
    //     { x: 9.953136673107782, pdf: 0.0019931904762988104 },
    //     { x: 10.054845892796212, pdf: 0.002285522927427827 },
    //     { x: 10.157594459748662, pdf: 0.002613657928409247 },
    //     { x: 10.261392994858094, pdf: 0.00298083747785083 },
    //     { x: 10.36625222755036, pdf: 0.00339042572532841 },
    //     { x: 10.472182996893284, pdf: 0.003845887333473609 },
    //     { x: 10.579196252717077, pdf: 0.0043507613904719255 },
    //     { x: 10.687303056746186, pdf: 0.004908630712509229 },
    //     { x: 10.796514583742733, pdf: 0.00552308644662074 },
    //     { x: 10.906842122661612, pdf: 0.006197687966875915 },
    //     { x: 11.018297077817413, pdf: 0.006935918150280943 },
    //     { x: 11.130890970063263, pdf: 0.007741134222211307 },
    //     { x: 11.2446354379817, pdf: 0.00861651447320171 },
    //     { x: 11.359542239087734, pdf: 0.009565001267702787 },
    //     { x: 11.475623251044201, pdf: 0.010589240888730601 },
    //     { x: 11.592890472889518, pdf: 0.011691520887560489 },
    //     { x: 11.711356026278011, pdf: 0.012873705731766286 },
    //     { x: 11.831032156732894, pdf: 0.014137171664688699 },
    //     { x: 11.951931234912063, pdf: 0.01548274180130405 },
    //     { x: 12.07406575788683, pdf: 0.016910622585775168 },
    //     { x: 12.197448350433708, pdf: 0.018420342820962683 },
    //     { x: 12.322091766339417, pdf: 0.020010696546175967 },
    //     { x: 12.448008889719205, pdf: 0.021679691082941988 },
    //     { x: 12.575212736348655, pdf: 0.023424501586361234 },
    //     { x: 12.703716455009102, pdf: 0.025241433428925014 },
    //     { x: 12.833533328846784, pdf: 0.027125893702261122 },
    //     { x: 12.964676776745897, pdf: 0.029072373048600202 },
    //     { x: 13.097160354715674, pdf: 0.03107443892702878 },
    //     { x: 13.230997757291643, pdf: 0.0331247412798984 },
    //     { x: 13.366202818951194, pdf: 0.03521503139309641 },
    //     { x: 13.50278951554363, pdf: 0.03733619454222775 },
    //     { x: 13.640771965734805, pdf: 0.039478296788055166 },
    //     { x: 13.780164432466549, pdf: 0.04163064603270107 },
    //     { x: 13.920981324430999, pdf: 0.04378186717793234 },
    //     { x: 14.063237197559985, pdf: 0.04591999094394063 },
    //     { x: 14.20694675652965, pdf: 0.048032555617702366 },
    //     { x: 14.35212485628044, pdf: 0.050106720711093324 },
    //     { x: 14.498786503552626, pdf: 0.052129391227648016 },
    //     { x: 14.646946858437516, pdf: 0.05408735097055588 },
    //     { x: 14.796621235944524, pdf: 0.05596740308048474 },
    //     { x: 14.947825107584242, pdf: 0.05775651577714975 },
    //     { x: 15.100574102967704, pdf: 0.05944197109973037 },
    //     { x: 15.254884011421979, pdf: 0.0610115143040895 },
    //     { x: 15.410770783622281, pdf: 0.06245350148414965 },
    //     { x: 15.568250533240755, pdf: 0.06375704294451334 },
    //     { x: 15.727339538612112, pdf: 0.06491213986400327 },
    //     { x: 15.888054244416281, pdf: 0.06590981185639877 },
    //     { x: 16.05041126337827, pdf: 0.06674221315497592 },
    //     { x: 16.21442737798537, pdf: 0.06740273531976387 },
    //     { x: 16.38011954222194, pdf: 0.06788609458751015 },
    //     { x: 16.547504883321892, pdf: 0.06818840224961567 },
    //     { x: 16.7166007035391, pdf: 0.06830721674690912 },
    //     { x: 16.8874244819359, pdf: 0.06824157650511187 },
    //     { x: 17.059993876189846, pdf: 0.06799201289332384 },
    //     { x: 17.234326724418974, pdf: 0.06756054306126427 },
    //     { x: 17.410441047025657, pdf: 0.06695064279031931 },
    //     { x: 17.58835504855935, pdf: 0.06616719986949657 },
    //     { x: 17.768087119598363, pdf: 0.06521644887107333 },
    //     { x: 17.949655838650838, pdf: 0.06410588854332999 },
    //     { x: 18.133079974075173, pdf: 0.06284418335117622 },
    //     { x: 18.318378486020073, pdf: 0.06144105097245895 },
    //     { x: 18.505570528384407, pdf: 0.05990713779209599 },
    //     { x: 18.69467545079712, pdf: 0.058253884622945194 },
    //     { x: 18.885712800617345, pdf: 0.056493385017886685 },
    //     { x: 19.078702324954982, pdf: 0.05463823861978922 },
    //     { x: 19.273663972711912, pdf: 0.05270140202414444 },
    //     { x: 19.470617896644058, pdf: 0.050696039603930654 },
    //     { x: 19.66958445544455, pdf: 0.04863537666985231 },
    //     { x: 19.870584215848147, pdf: 0.04653255721492421 },
    //     { x: 20.073637954757178, pdf: 0.04440050832501409 },
    //     { x: 20.278766661389206, pdf: 0.042251813131985824 },
    //     { x: 20.485991539446626, pdf: 0.04009859394984052 },
    //     { x: 20.69533400930847, pdf: 0.03795240697364387 },
    //     { x: 20.906815710244558, pdf: 0.03582414964330889 },
    //     { x: 21.120458502652312, pdf: 0.03372398148684345 },
    //     { x: 21.33628447031642, pdf: 0.03166125896774226 },
    //     { x: 21.554315922691586, pdf: 0.02964448457576937 },
    //     { x: 21.774575397208615, pdf: 0.02768127012591452 },
    //     { x: 21.997085661604032, pdf: 0.02577831397264268 },
    //     { x: 22.221869716273574, pdf: 0.023941391610736773 },
    //     { x: 22.448950796649655, pdf: 0.02217535892423078 },
    //     { x: 22.678352375603183, pdf: 0.020484167164369224 },
    //     { x: 22.910098165869883, pdf: 0.01887088858846632 },
    //     { x: 23.144212122501443, pdf: 0.017337751575253052 },
    //     { x: 23.380718445341685, pdf: 0.015886183949135855 },
    //     { x: 23.619641581528064, pdf: 0.014516863195202644 },
    //     { x: 23.861006228018695, pdf: 0.01322977222745922 },
    //     { x: 24.10483733414524, pdf: 0.01202425938261601 },
    //     { x: 24.35116010419185, pdf: 0.010899101348140865 },
    //     ... 1 more item
    //   ]
    // }

    arr = [13.8, 19.5, 16.7, 14.3, 17.5, 14.5, 12.6, 15.6, 8.9, 13.3, 17.1, 15, 16.3, 18.3, 18.7, 16.7, 20.9, 12.3, 22.3, 14.6, 20.1, 16.7, 16.8, 24.2, 21.2, 20.7, 18.6, 18.3, 15.9, 17.2, 18.8, 16.3, 20.5, 14.7, 17.5, 24.1, 14.6, 21.1, 17, 19.6, 21.2, 16, 16.5, 9.3, 16.2, 14.9, 16.3, 13.9, 18.4, 19.2, 24.6, 20.2, 12.8, 12.9, 14.1, 18.5, 13.4, 17.1, 9.9, 21.9, 19.6, 18.3, 19.7, 16.6, 21.7, 11.8, 15.9, 11.4, 14.3, 17.4, 16.4, 20.7, 18.6, 22, 17.9, 16.3, 15.4, 17.2, 17.3, 18.3, 16.8, 20.9, 15, 15.1, 18.6, 17.5, 14.7, 17.4, 13.8, 18.3, 17.2, 13.4, 12.5, 22.8, 18.6, 16.3, 16.1, 15.7, 20.8, 16.4]
    r = await arrLogNormHist(arr, {
        dx: 1,
    })
    console.log(r)
    // => {
    //   avg: 17.048000000000002,
    //   std: 3.1686749612576244,
    //   avg_geo: 16.741131283482233,
    //   avg_log: 2.817868642436364,
    //   std_log: 0.19557811714294832,
    //   arr: [
    //     13.8, 19.5, 16.7, 14.3, 17.5, 14.5, 12.6, 15.6,  8.9, 13.3,
    //     17.1,   15, 16.3, 18.3, 18.7, 16.7, 20.9, 12.3, 22.3, 14.6,
    //     20.1, 16.7, 16.8, 24.2, 21.2, 20.7, 18.6, 18.3, 15.9, 17.2,
    //     18.8, 16.3, 20.5, 14.7, 17.5, 24.1, 14.6, 21.1,   17, 19.6,
    //     21.2,   16, 16.5,  9.3, 16.2, 14.9, 16.3, 13.9, 18.4, 19.2,
    //     24.6, 20.2, 12.8, 12.9, 14.1, 18.5, 13.4, 17.1,  9.9, 21.9,
    //     19.6, 18.3, 19.7, 16.6, 21.7, 11.8, 15.9, 11.4, 14.3, 17.4,
    //     16.4, 20.7, 18.6,   22, 17.9, 16.3, 15.4, 17.2, 17.3, 18.3,
    //     16.8, 20.9,   15, 15.1, 18.6, 17.5, 14.7, 17.4, 13.8, 18.3,
    //     17.2, 13.4, 12.5, 22.8, 18.6, 16.3, 16.1, 15.7, 20.8, 16.4
    //   ],
    //   min: 8,
    //   max: 25,
    //   barWidth: 1,
    //   ratioForCountToPdf: 0.01,
    //   bins: [
    //     { min: 8, max: 9, avg: 8.5, arr: [Array], counts: 1, pdf: 0.01 },
    //     { min: 9, max: 10, avg: 9.5, arr: [Array], counts: 2, pdf: 0.02 },
    //     { min: 10, max: 11, avg: 10.5, arr: [], counts: 0, pdf: 0 },
    //     { min: 11, max: 12, avg: 11.5, arr: [Array], counts: 2, pdf: 0.02 },
    //     { min: 12, max: 13, avg: 12.5, arr: [Array], counts: 5, pdf: 0.05 },
    //     { min: 13, max: 14, avg: 13.5, arr: [Array], counts: 6, pdf: 0.06 },
    //     {
    //       min: 14,
    //       max: 15,
    //       avg: 14.5,
    //       arr: [Array],
    //       counts: 11,
    //       pdf: 0.11
    //     },
    //     { min: 15, max: 16, avg: 15.5, arr: [Array], counts: 7, pdf: 0.07 },
    //     {
    //       min: 16,
    //       max: 17,
    //       avg: 16.5,
    //       arr: [Array],
    //       counts: 17,
    //       pdf: 0.17
    //     },
    //     {
    //       min: 17,
    //       max: 18,
    //       avg: 17.5,
    //       arr: [Array],
    //       counts: 12,
    //       pdf: 0.12
    //     },
    //     {
    //       min: 18,
    //       max: 19,
    //       avg: 18.5,
    //       arr: [Array],
    //       counts: 13,
    //       pdf: 0.13
    //     },
    //     { min: 19, max: 20, avg: 19.5, arr: [Array], counts: 5, pdf: 0.05 },
    //     { min: 20, max: 21, avg: 20.5, arr: [Array], counts: 8, pdf: 0.08 },
    //     { min: 21, max: 22, avg: 21.5, arr: [Array], counts: 6, pdf: 0.06 },
    //     { min: 22, max: 23, avg: 22.5, arr: [Array], counts: 2, pdf: 0.02 },
    //     { min: 23, max: 24, avg: 23.5, arr: [], counts: 0, pdf: 0 },
    //     { min: 24, max: 25, avg: 24.5, arr: [Array], counts: 3, pdf: 0.03 }
    //   ],
    //   curves: [
    //     { x: 8.9, pdf: 0.00037451241516612313 },
    //     { x: 8.990947415368343, pdf: 0.0004423975904714686 },
    //     { x: 9.082824205159403, pdf: 0.0005211775170478083 },
    //     { x: 9.17563986647449, pdf: 0.0006123292113229907 },
    //     { x: 9.269403993463994, pdf: 0.0007174814373991145 },
    //     { x: 9.36412627831911, pdf: 0.0008384221570662737 },
    //     { x: 9.459816512273708, pdf: 0.000977104942909971 },
    //     { x: 9.556484586616412, pdf: 0.0011356540643755286 },
    //     { x: 9.65414049371306, pdf: 0.0013163679344597463 },
    //     { x: 9.752794328039583, pdf: 0.001521720586050793 },
    //     { x: 9.852456287225452, pdf: 0.0017543608329108264 },
    //     { x: 9.953136673107782, pdf: 0.0020171087620143957 },
    //     { x: 10.054845892796212, pdf: 0.0023129492025569603 },
    //     { x: 10.157594459748662, pdf: 0.0026450218235501573 },
    //     { x: 10.261392994858094, pdf: 0.003016607527585039 },
    //     { x: 10.36625222755036, pdf: 0.00343111083403235 },
    //     { x: 10.472182996893284, pdf: 0.003892037981475291 },
    //     { x: 10.579196252717077, pdf: 0.0044029705271575875 },
    //     { x: 10.687303056746186, pdf: 0.004967534281059338 },
    //     { x: 10.796514583742733, pdf: 0.005589363483980187 },
    //     { x: 10.906842122661612, pdf: 0.006272060222478424 },
    //     { x: 11.018297077817413, pdf: 0.007019149168084312 },
    //     { x: 11.130890970063263, pdf: 0.00783402783287784 },
    //     { x: 11.2446354379817, pdf: 0.008719912646880127 },
    //     { x: 11.359542239087734, pdf: 0.009679781282915217 },
    //     { x: 11.475623251044201, pdf: 0.010716311779395365 },
    //     { x: 11.592890472889518, pdf: 0.01183181913821121 },
    //     { x: 11.711356026278011, pdf: 0.013028190200547476 },
    //     { x: 11.831032156732894, pdf: 0.014306817724664958 },
    //     { x: 11.951931234912063, pdf: 0.015668534702919693 },
    //     { x: 12.07406575788683, pdf: 0.017113550056804462 },
    //     { x: 12.197448350433708, pdf: 0.01864138693481423 },
    //     { x: 12.322091766339417, pdf: 0.020250824904730073 },
    //     { x: 12.448008889719205, pdf: 0.021939847375937287 },
    //     { x: 12.575212736348655, pdf: 0.02370559560539756 },
    //     { x: 12.703716455009102, pdf: 0.025544330630072103 },
    //     { x: 12.833533328846784, pdf: 0.027451404426688246 },
    //     { x: 12.964676776745897, pdf: 0.029421241525183394 },
    //     { x: 13.097160354715674, pdf: 0.03144733219415311 },
    //     { x: 13.230997757291643, pdf: 0.03352223817525717 },
    //     { x: 13.366202818951194, pdf: 0.03563761176981355 },
    //     { x: 13.50278951554363, pdf: 0.03778422887673447 },
    //     { x: 13.640771965734805, pdf: 0.03995203634951181 },
    //     { x: 13.780164432466549, pdf: 0.04213021378509347 },
    //     { x: 13.920981324430999, pdf: 0.04430724958406751 },
    //     { x: 14.063237197559985, pdf: 0.0464710308352679 },
    //     { x: 14.20694675652965, pdf: 0.04860894628511478 },
    //     { x: 14.35212485628044, pdf: 0.05070800135962642 },
    //     { x: 14.498786503552626, pdf: 0.052754943922379775 },
    //     { x: 14.646946858437516, pdf: 0.05473639918220253 },
    //     { x: 14.796621235944524, pdf: 0.056639011917450535 },
    //     { x: 14.947825107584242, pdf: 0.058449593966475526 },
    //     { x: 15.100574102967704, pdf: 0.06015527475292711 },
    //     { x: 15.254884011421979, pdf: 0.061743652475738556 },
    //     { x: 15.410770783622281, pdf: 0.06320294350195943 },
    //     { x: 15.568250533240755, pdf: 0.06452212745984748 },
    //     { x: 15.727339538612112, pdf: 0.06569108554237128 },
    //     { x: 15.888054244416281, pdf: 0.06670072959867554 },
    //     { x: 16.05041126337827, pdf: 0.0675431197128356 },
    //     { x: 16.21442737798537, pdf: 0.06821156814360102 },
    //     { x: 16.38011954222194, pdf: 0.06870072772256025 },
    //     { x: 16.547504883321892, pdf: 0.06900666307661103 },
    //     { x: 16.7166007035391, pdf: 0.06912690334787201 },
    //     { x: 16.8874244819359, pdf: 0.06906047542317319 },
    //     { x: 17.059993876189846, pdf: 0.0688079170480437 },
    //     { x: 17.234326724418974, pdf: 0.06837126957799942 },
    //     { x: 17.410441047025657, pdf: 0.06775405050380312 },
    //     { x: 17.58835504855935, pdf: 0.0669612062679305 },
    //     { x: 17.768087119598363, pdf: 0.06599904625752619 },
    //     { x: 17.949655838650838, pdf: 0.06487515920584992 },
    //     { x: 18.133079974075173, pdf: 0.06359831355139031 },
    //     { x: 18.318378486020073, pdf: 0.06217834358412844 },
    //     { x: 18.505570528384407, pdf: 0.06062602344560113 },
    //     { x: 18.69467545079712, pdf: 0.05895293123842051 },
    //     { x: 18.885712800617345, pdf: 0.05717130563810131 },
    //     { x: 19.078702324954982, pdf: 0.05529389748322667 },
    //     { x: 19.273663972711912, pdf: 0.053333818848434154 },
    //     { x: 19.470617896644058, pdf: 0.0513043920791778 },
    //     { x: 19.66958445544455, pdf: 0.04921900118989052 },
    //     { x: 19.870584215848147, pdf: 0.04709094790150329 },
    //     { x: 20.073637954757178, pdf: 0.044933314424914245 },
    //     { x: 20.278766661389206, pdf: 0.04275883488956964 },
    //     { x: 20.485991539446626, pdf: 0.040579777077238595 },
    //     { x: 20.69533400930847, pdf: 0.03840783585732758 },
    //     { x: 20.906815710244558, pdf: 0.036254039439028586 },
    //     { x: 21.120458502652312, pdf: 0.03412866926468555 },
    //     { x: 21.33628447031642, pdf: 0.032041194075355155 },
    //     { x: 21.554315922691586, pdf: 0.03000021839067859 },
    //     { x: 21.774575397208615, pdf: 0.028013445367425484 },
    //     { x: 21.997085661604032, pdf: 0.02608765374031438 },
    //     { x: 22.221869716273574, pdf: 0.024228688310065607 },
    //     { x: 22.448950796649655, pdf: 0.022441463231321544 },
    //     { x: 22.678352375603183, pdf: 0.020729977170341647 },
    //     { x: 22.910098165869883, pdf: 0.019097339251527908 },
    //     { x: 23.144212122501443, pdf: 0.01754580459415608 },
    //     { x: 23.380718445341685, pdf: 0.01607681815652548 },
    //     { x: 23.619641581528064, pdf: 0.01469106555354507 },
    //     { x: 23.861006228018695, pdf: 0.013388529494188726 },
    //     { x: 24.10483733414524, pdf: 0.012168550495207398 },
    //     { x: 24.35116010419185, pdf: 0.01102989056431855 },
    //     ... 1 more item
    //   ]
    // }

    arr = [12, 36, 9, 13, 6, 17, 7, 12, 31, 57, 44, 32, 16, 11, 10, 38, 31, 28, 26, 7, 16, 16, 16, 13, 7, 8, 12, 17, 11, 20, 7, 6, 14, 7, 37, 11, 7, 8, 8, 32, 29, 52, 20, 6, 11, 12, 33, 48, 10, 27, 11, 24, 17, 11, 23, 20, 13, 16, 16, 17, 13, 15, 13, 26, 11, 13, 29, 18, 18, 13, 11, 12, 9, 17, 19, 14, 19, 9, 37, 32, 14, 20, 13, 22, 12, 14, 33, 15, 20, 37, 24, 19, 15, 15, 5, 11, 13, 60, 39, 17, 6, 18, 40, 21, 18, 17, 12, 12, 10, 39, 27, 10, 8, 44, 36, 18, 11, 8, 13, 9, 25, 11, 10, 55, 54, 13, 8, 19, 38, 9, 17, 14, 9, 12, 54, 22, 11, 19, 50, 18, 12, 40, 52, 12, 15, 7, 12, 15, 18, 19, 11, 43, 23, 14, 25, 32, 23, 15, 12, 20, 14, 10, 12, 24, 50, 40, 16, 14, 9, 27, 9, 11, 17, 19, 12, 17, 14, 5, 24, 22, 60, 20, 9, 11, 11, 6, 7, 8, 31, 10, 12, 9, 11, 26, 14, 7, 14, 57, 19, 9, 10, 9, 19, 19, 15, 21, 48, 23, 26, 14, 46, 51, 10, 10, 9, 7, 19, 46, 27, 18, 12, 10, 36, 15, 5, 11, 13, 21, 15, 15, 16, 29, 44, 42, 7, 14, 9, 6, 22, 24, 18, 39, 7, 50, 33, 11, 20, 17, 18, 48, 8, 21, 20, 12, 41, 11, 18, 11, 58, 18, 21, 23, 12, 67, 35]
    r = await arrLogNormHist(arr, {
        n: 69,
        min: 1,
        max: 70,
    })
    // r.bins = r.bins.map((v) => {
    //     delete v.arr
    //     return v
    // })
    // fs.writeFileSync('bins.csv', w.getCsvStrFromData(r.bins), 'utf8')
    // fs.writeFileSync('curves.csv', w.getCsvStrFromData(r.curves), 'utf8')
    console.log(r)
    // => {
    //   avg: 20.11320754716981,
    //   std: 13.078811770347688,
    //   avg_geo: 16.807250444562037,
    //   avg_log: 2.821810367388979,
    //   std_log: 0.5877705593811017,
    //   arr: [
    //     12, 36,  9, 13,  6, 17,  7, 12, 31, 57, 44, 32,
    //     16, 11, 10, 38, 31, 28, 26,  7, 16, 16, 16, 13,
    //      7,  8, 12, 17, 11, 20,  7,  6, 14,  7, 37, 11,
    //      7,  8,  8, 32, 29, 52, 20,  6, 11, 12, 33, 48,
    //     10, 27, 11, 24, 17, 11, 23, 20, 13, 16, 16, 17,
    //     13, 15, 13, 26, 11, 13, 29, 18, 18, 13, 11, 12,
    //      9, 17, 19, 14, 19,  9, 37, 32, 14, 20, 13, 22,
    //     12, 14, 33, 15, 20, 37, 24, 19, 15, 15,  5, 11,
    //     13, 60, 39, 17,
    //     ... 165 more items
    //   ],
    //   min: 1,
    //   max: 70,
    //   barWidth: 1,
    //   ratioForCountToPdf: 0.0037735849056603774,
    //   bins: [
    //     { min: 1, max: 2, avg: 1.5, counts: 0, pdf: 0 },
    //     { min: 2, max: 3, avg: 2.5, counts: 0, pdf: 0 },
    //     { min: 3, max: 4, avg: 3.5, counts: 0, pdf: 0 },
    //     { min: 4, max: 5, avg: 4.5, counts: 3, pdf: 0.011320754716981131 },
    //     { min: 5, max: 6, avg: 5.5, counts: 6, pdf: 0.022641509433962263 },
    //     { min: 6, max: 7, avg: 6.5, counts: 12, pdf: 0.045283018867924525 },
    //     { min: 7, max: 8, avg: 7.5, counts: 8, pdf: 0.03018867924528302 },
    //     { min: 8, max: 9, avg: 8.5, counts: 14, pdf: 0.052830188679245285 },
    //     { min: 9, max: 10, avg: 9.5, counts: 11, pdf: 0.04150943396226415 },
    //     {
    //       min: 10,
    //       max: 11,
    //       avg: 10.5,
    //       counts: 21,
    //       pdf: 0.07924528301886792
    //     },
    //     {
    //       min: 11,
    //       max: 12,
    //       avg: 11.5,
    //       counts: 19,
    //       pdf: 0.07169811320754717
    //     },
    //     {
    //       min: 12,
    //       max: 13,
    //       avg: 12.5,
    //       counts: 12,
    //       pdf: 0.045283018867924525
    //     },
    //     {
    //       min: 13,
    //       max: 14,
    //       avg: 13.5,
    //       counts: 13,
    //       pdf: 0.04905660377358491
    //     },
    //     {
    //       min: 14,
    //       max: 15,
    //       avg: 14.5,
    //       counts: 11,
    //       pdf: 0.04150943396226415
    //     },
    //     {
    //       min: 15,
    //       max: 16,
    //       avg: 15.5,
    //       counts: 8,
    //       pdf: 0.03018867924528302
    //     },
    //     {
    //       min: 16,
    //       max: 17,
    //       avg: 16.5,
    //       counts: 11,
    //       pdf: 0.04150943396226415
    //     },
    //     {
    //       min: 17,
    //       max: 18,
    //       avg: 17.5,
    //       counts: 12,
    //       pdf: 0.045283018867924525
    //     },
    //     {
    //       min: 18,
    //       max: 19,
    //       avg: 18.5,
    //       counts: 11,
    //       pdf: 0.04150943396226415
    //     },
    //     {
    //       min: 19,
    //       max: 20,
    //       avg: 19.5,
    //       counts: 9,
    //       pdf: 0.033962264150943396
    //     },
    //     {
    //       min: 20,
    //       max: 21,
    //       avg: 20.5,
    //       counts: 5,
    //       pdf: 0.018867924528301886
    //     },
    //     {
    //       min: 21,
    //       max: 22,
    //       avg: 21.5,
    //       counts: 4,
    //       pdf: 0.01509433962264151
    //     },
    //     {
    //       min: 22,
    //       max: 23,
    //       avg: 22.5,
    //       counts: 5,
    //       pdf: 0.018867924528301886
    //     },
    //     {
    //       min: 23,
    //       max: 24,
    //       avg: 23.5,
    //       counts: 5,
    //       pdf: 0.018867924528301886
    //     },
    //     {
    //       min: 24,
    //       max: 25,
    //       avg: 24.5,
    //       counts: 2,
    //       pdf: 0.007547169811320755
    //     },
    //     {
    //       min: 25,
    //       max: 26,
    //       avg: 25.5,
    //       counts: 4,
    //       pdf: 0.01509433962264151
    //     },
    //     {
    //       min: 26,
    //       max: 27,
    //       avg: 26.5,
    //       counts: 4,
    //       pdf: 0.01509433962264151
    //     },
    //     {
    //       min: 27,
    //       max: 28,
    //       avg: 27.5,
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     {
    //       min: 28,
    //       max: 29,
    //       avg: 28.5,
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     { min: 29, max: 30, avg: 29.5, counts: 0, pdf: 0 },
    //     {
    //       min: 30,
    //       max: 31,
    //       avg: 30.5,
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     {
    //       min: 31,
    //       max: 32,
    //       avg: 31.5,
    //       counts: 4,
    //       pdf: 0.01509433962264151
    //     },
    //     {
    //       min: 32,
    //       max: 33,
    //       avg: 32.5,
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     { min: 33, max: 34, avg: 33.5, counts: 0, pdf: 0 },
    //     {
    //       min: 34,
    //       max: 35,
    //       avg: 34.5,
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     {
    //       min: 35,
    //       max: 36,
    //       avg: 35.5,
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     {
    //       min: 36,
    //       max: 37,
    //       avg: 36.5,
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     {
    //       min: 37,
    //       max: 38,
    //       avg: 37.5,
    //       counts: 2,
    //       pdf: 0.007547169811320755
    //     },
    //     {
    //       min: 38,
    //       max: 39,
    //       avg: 38.5,
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     {
    //       min: 39,
    //       max: 40,
    //       avg: 39.5,
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     {
    //       min: 40,
    //       max: 41,
    //       avg: 40.5,
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     {
    //       min: 41,
    //       max: 42,
    //       avg: 41.5,
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     {
    //       min: 42,
    //       max: 43,
    //       avg: 42.5,
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     {
    //       min: 43,
    //       max: 44,
    //       avg: 43.5,
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     { min: 44, max: 45, avg: 44.5, counts: 0, pdf: 0 },
    //     {
    //       min: 45,
    //       max: 46,
    //       avg: 45.5,
    //       counts: 2,
    //       pdf: 0.007547169811320755
    //     },
    //     { min: 46, max: 47, avg: 46.5, counts: 0, pdf: 0 },
    //     {
    //       min: 47,
    //       max: 48,
    //       avg: 47.5,
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     { min: 48, max: 49, avg: 48.5, counts: 0, pdf: 0 },
    //     {
    //       min: 49,
    //       max: 50,
    //       avg: 49.5,
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     {
    //       min: 50,
    //       max: 51,
    //       avg: 50.5,
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     {
    //       min: 51,
    //       max: 52,
    //       avg: 51.5,
    //       counts: 2,
    //       pdf: 0.007547169811320755
    //     },
    //     { min: 52, max: 53, avg: 52.5, counts: 0, pdf: 0 },
    //     {
    //       min: 53,
    //       max: 54,
    //       avg: 53.5,
    //       counts: 2,
    //       pdf: 0.007547169811320755
    //     },
    //     {
    //       min: 54,
    //       max: 55,
    //       avg: 54.5,
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     { min: 55, max: 56, avg: 55.5, counts: 0, pdf: 0 },
    //     {
    //       min: 56,
    //       max: 57,
    //       avg: 56.5,
    //       counts: 2,
    //       pdf: 0.007547169811320755
    //     },
    //     {
    //       min: 57,
    //       max: 58,
    //       avg: 57.5,
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     { min: 58, max: 59, avg: 58.5, counts: 0, pdf: 0 },
    //     {
    //       min: 59,
    //       max: 60,
    //       avg: 59.5,
    //       counts: 2,
    //       pdf: 0.007547169811320755
    //     },
    //     { min: 60, max: 61, avg: 60.5, counts: 0, pdf: 0 },
    //     { min: 61, max: 62, avg: 61.5, counts: 0, pdf: 0 },
    //     { min: 62, max: 63, avg: 62.5, counts: 0, pdf: 0 },
    //     { min: 63, max: 64, avg: 63.5, counts: 0, pdf: 0 },
    //     { min: 64, max: 65, avg: 64.5, counts: 0, pdf: 0 },
    //     { min: 65, max: 66, avg: 65.5, counts: 0, pdf: 0 },
    //     {
    //       min: 66,
    //       max: 67,
    //       avg: 66.5,
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     { min: 67, max: 68, avg: 67.5, counts: 0, pdf: 0 },
    //     { min: 68, max: 69, avg: 68.5, counts: 0, pdf: 0 },
    //     { min: 69, max: 70, avg: 69.5, counts: 0, pdf: 0 }
    //   ],
    //   curves: [
    //     { x: 5, pdf: 0.006970263647771901 },
    //     { x: 5.1314612337167205, pdf: 0.007627449421952031 },
    //     { x: 5.266378878627506, pdf: 0.008330340805749705 },
    //     { x: 5.404843811548318, pdf: 0.00908028550685169 },
    //     { x: 5.546949298650784, pdf: 0.009878466707792261 },
    //     { x: 5.6927910582837296, pdf: 0.010725878642582927 },
    //     { x: 5.84246732544643, pdf: 0.011623301921523003 },
    //     { x: 5.996078917956994, pdf: 0.012571278882578144 },
    //     { x: 6.153729304360484, pdf: 0.013570089271484143 },
    //     { x: 6.315524673622478, pdf: 0.014619726573641327 },
    //     { x: 6.481574006655039, pdf: 0.015719875338288225 },
    //     { x: 6.65198914972326, pdf: 0.016869889848776513 },
    //     { x: 6.826884889781832, pdf: 0.018068774501442092 },
    //     { x: 7.006379031792385, pdf: 0.01931516625905629 },
    //     { x: 7.190592478073664, pdf: 0.020607319542689222 },
    //     { x: 7.379649309738012, pdf: 0.021943093917644478 },
    //     { x: 7.573676870268995, pdf: 0.02331994491464581 },
    //     { x: 7.772805851296467, pdf: 0.024734918306493096 },
    //     { x: 7.9771703806268635, pdf: 0.026184648132895973 },
    //     { x: 8.186908112588002, pdf: 0.0276653587322046 },
    //     { x: 8.402160320749253, pdf: 0.029172870998490696 },
    //     { x: 8.62307199307953, pdf: 0.030702613036224635 },
    //     { x: 8.849791929607198, pdf: 0.032249635333126726 },
    //     { x: 9.082472842647686, pdf: 0.03380863051525675 },
    //     { x: 9.321271459666303, pdf: 0.03537395768779317 },
    //     { x: 9.566348628845542, pdf: 0.036939671301112156 },
    //     { x: 9.817869427428002, pdf: 0.03849955441568438 },
    //     { x: 10.076003272907876, pdf: 0.040047156172040195 },
    //     { x: 10.340924037145914, pdf: 0.04157583320475795 },
    //     { x: 10.612810163484735, pdf: 0.04307879467330953 },
    //     { x: 10.891844786943345, pdf: 0.04454915051888296 },
    //     { x: 11.178215857571868, pdf: 0.04597996249623112 },
    //     { x: 11.472116267049511, pdf: 0.047364297474381256 },
    //     { x: 11.773743978611112, pdf: 0.04869528245084682 },
    //     { x: 12.083302160389717, pdf: 0.049966160681897076 },
    //     { x: 12.400999322265069, pdf: 0.05117034829744484 },
    //     { x: 12.727049456310107, pdf: 0.052301490744063775 },
    //     { x: 13.061672180930158, pdf: 0.05335351838424792 },
    //     { x: 13.405092888791849, pdf: 0.05432070057481254 },
    //     { x: 13.757542898641415, pdf: 0.05519769755265327 },
    //     { x: 14.119259611114638, pdf: 0.05597960947208052 },
    //     { x: 14.490486668643399, pdf: 0.05666202196456824 },
    //     { x: 14.87147411956651, pdf: 0.05724104762873568 },
    //     { x: 15.262478586555412, pdf: 0.057713362905240304 },
    //     { x: 15.663763439468136, pdf: 0.05807623984732463 },
    //     { x: 16.075598972748008, pdf: 0.05832757236216284 },
    //     { x: 16.498262587486547, pdf: 0.058465896569855 },
    //     { x: 16.93203897827323, pdf: 0.058490405004725236 },
    //     { x: 17.37722032495791, pdf: 0.05840095446617321 },
    //     { x: 17.834106489455163, pdf: 0.05819806741228262 },
    //     { x: 18.303005217722994, pdf: 0.05788292687721193 },
    //     { x: 18.784232347052086, pdf: 0.05745736498154505 },
    //     { x: 19.27811201880509, pdf: 0.05692384519172349 },
    //     { x: 19.784976896749342, pdf: 0.05628543856889881 },
    //     { x: 20.30516839113004, pdf: 0.055545794327578314 },
    //     { x: 20.839036888634787, pdf: 0.05470910509891854 },
    //     { x: 21.386941988404423, pdf: 0.05378006736119961 },
    //     { x: 21.949252744249144, pdf: 0.05276383755977885 },
    //     { x: 22.526347913232968, pdf: 0.05166598448973478 },
    //     { x: 23.11861621079411, pdf: 0.050492438555709084 },
    //     { x: 23.726456572572985, pdf: 0.04924943855457474 },
    //     { x: 24.350278423124315, pdf: 0.04794347664714489 },
    //     { x: 24.99050195169423, pdf: 0.0465812421950407 },
    //     { x: 25.647558395248204, pdf: 0.04516956513812022 },
    //     { x: 26.3218903289404, pdf: 0.04371535957679493 },
    //     { x: 27.013951964220148, pdf: 0.042225568202584655 },
    //     { x: 27.724209454776272, pdf: 0.04070710819001564 },
    //     { x: 28.45314121052541, pdf: 0.039166819124245834 },
    //     { x: 29.20123821985576, pdf: 0.03761141349253633 },
    //     { x: 29.96900438034338, pdf: 0.036047430214923175 },
    //     { x: 30.756956838163735, pdf: 0.03448119163131486 },
    //     { x: 31.565626336427126, pdf: 0.032918764299941956 },
    //     { x: 32.39555757267267, pdf: 0.0313659238968475 },
    //     { x: 33.2473095657616, pdf: 0.029828124439166825 },
    //     { x: 34.12145603241695, pdf: 0.028310471987520833 },
    //     { x: 35.01858577366343, pdf: 0.026817702916113594 },
    //     { x: 35.93930307142755, pdf: 0.025354166774189748 },
    //     { x: 36.884228095565355, pdf: 0.023923813700393242 },
    //     { x: 37.853997321591756, pdf: 0.022530186293193852 },
    //     { x: 38.849263959392935, pdf: 0.021176415786713233 },
    //     { x: 39.8706983932106, pdf: 0.019865222332660623 },
    //     { x: 40.91898863319436, pdf: 0.01859891914621804 },
    //     { x: 41.9948407788264, pdf: 0.01737942023699428 },
    //     { x: 43.09897949453077, pdf: 0.016208251415856353 },
    //     { x: 44.2321484977873, pdf: 0.015086564244669668 },
    //     { x: 45.39511106007937, pdf: 0.014015152578726816 },
    //     { x: 46.5886505210125, pdf: 0.012994471340790056 },
    //     { x: 47.813570815950385, pdf: 0.01202465716097319 },
    //     { x: 49.07069701752372, pdf: 0.011105550517804371 },
    //     { x: 50.36087589137634, pdf: 0.010236719022315948 },
    //     { x: 51.684976466523345, pdf: 0.009417481498404745 },
    //     { x: 53.04389062070511, pdf: 0.008646932528443427 },
    //     { x: 54.43853368113166, pdf: 0.007923967152609103 },
    //     { x: 55.86984504102183, pdf: 0.007247305433011932 },
    //     { x: 57.33878879235279, pdf: 0.006615516618826953 },
    //     { x: 58.846354375245824, pdf: 0.00602704267563308 },
    //     { x: 60.39355724442606, pdf: 0.005480220970436274 },
    //     { x: 61.9814395532048, pdf: 0.0049733059328185055 },
    //     { x: 63.61107085544534, pdf: 0.004504489541766293 },
    //     { x: 65.28354882598506, pdf: 0.004071920516492762 },
    //     ... 1 more item
    //   ]
    // }

}
test()
    .catch((err) => {
        console.log(err)
    })

//node --experimental-modules --es-module-specifier-resolution=node g.arrLogNormHist.mjs
