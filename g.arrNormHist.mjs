import arrNormHist from './src/arrNormHist.mjs'
// import fs from 'fs'
// import w from 'wsemi'

async function test() {

    let arr
    let opt
    let r

    arr = [13.8, 19.5, 16.7, 14.3, 17.5, 14.5, 12.6, 15.6, 8.9, 13.3, 17.1, 15, 16.3, 18.3, 18.7, 16.7, 20.9, 12.3, 22.3, 14.6, 20.1, 16.7, 16.8, 24.2, 21.2, 20.7, 18.6, 18.3, 15.9, 17.2, 18.8, 16.3, 20.5, 14.7, 17.5, 24.1, 14.6, 21.1, 17, 19.6, 21.2, 16, 16.5, 9.3, 16.2, 14.9, 16.3, 13.9, 18.4, 19.2, 24.6, 20.2, 12.8, 12.9, 14.1, 18.5, 13.4, 17.1, 9.9, 21.9, 19.6, 18.3, 19.7, 16.6, 21.7, 11.8, 15.9, 11.4, 14.3, 17.4, 16.4, 20.7, 18.6, 22, 17.9, 16.3, 15.4, 17.2, 17.3, 18.3, 16.8, 20.9, 15, 15.1, 18.6, 17.5, 14.7, 17.4, 13.8, 18.3, 17.2, 13.4, 12.5, 22.8, 18.6, 16.3, 16.1, 15.7, 20.8, 16.4]
    opt = {
        n: 10,
        min: 12,
        max: 23,
    }
    r = await arrNormHist(arr, opt)
    console.log(r)
    // => {
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
    //     { x: 12, pdf: 0.03539347632001737 },
    //     { x: 12.11, pdf: 0.037383482855803 },
    //     { x: 12.219999999999999, pdf: 0.039437822053457874 },
    //     { x: 12.329999999999998, pdf: 0.04155494476232438 },
    //     { x: 12.439999999999998, pdf: 0.043732984782065484 },
    //     { x: 12.549999999999997, pdf: 0.04596975107654172 },
    //     { x: 12.659999999999997, pdf: 0.04826272158141871 },
    //     { x: 12.769999999999996, pdf: 0.05060903873486474 },
    //     { x: 12.879999999999995, pdf: 0.053005506852505095 },
    //     { x: 12.989999999999995, pdf: 0.05544859145799284 },
    //     { x: 13.099999999999994, pdf: 0.057934420669161386 },
    //     { x: 13.209999999999994, pdf: 0.06045878872679094 },
    //     { x: 13.319999999999993, pdf: 0.06301716173861893 },
    //     { x: 13.429999999999993, pdf: 0.06560468569544393 },
    //     { x: 13.539999999999992, pdf: 0.06821619679912554 },
    //     { x: 13.649999999999991, pdf: 0.07084623412410286 },
    //     { x: 13.759999999999991, pdf: 0.07348905461489254 },
    //     { x: 13.86999999999999, pdf: 0.07613865040205554 },
    //     { x: 13.97999999999999, pdf: 0.07878876839852786 },
    //     { x: 14.08999999999999, pdf: 0.08143293211719617 },
    //     { x: 14.199999999999989, pdf: 0.08406446562938243 },
    //     { x: 14.309999999999988, pdf: 0.08667651956270586 },
    //     { x: 14.419999999999987, pdf: 0.0892620990158537 },
    //     { x: 14.529999999999987, pdf: 0.09181409324734967 },
    //     { x: 14.639999999999986, pdf: 0.09432530697570551 },
    //     { x: 14.749999999999986, pdf: 0.09678849310961433 },
    //     { x: 14.859999999999985, pdf: 0.09919638670933023 },
    //     { x: 14.969999999999985, pdf: 0.10154173996430707 },
    //     { x: 15.079999999999984, pdf: 0.10381735795775265 },
    //     { x: 15.189999999999984, pdf: 0.10601613497619995 },
    //     { x: 15.299999999999983, pdf: 0.10813109111168648 },
    //     { x: 15.409999999999982, pdf: 0.11015540889583084 },
    //     { x: 15.519999999999982, pdf: 0.11208246969914742 },
    //     { x: 15.629999999999981, pdf: 0.11390588962545672 },
    //     { x: 15.73999999999998, pdf: 0.11561955463032393 },
    //     { x: 15.84999999999998, pdf: 0.11721765459414842 },
    //     { x: 15.95999999999998, pdf: 0.11869471608486172 },
    //     { x: 16.06999999999998, pdf: 0.120045633552169 },
    //     { x: 16.17999999999998, pdf: 0.12126569870485275 },
    //     { x: 16.289999999999978, pdf: 0.12235062783478269 },
    //     { x: 16.399999999999977, pdf: 0.12329658686584205 },
    //     { x: 16.509999999999977, pdf: 0.12410021392285919 },
    //     { x: 16.619999999999976, pdf: 0.124758639234666 },
    //     { x: 16.729999999999976, pdf: 0.12526950220640412 },
    //     { x: 16.839999999999975, pdf: 0.1256309655189545 },
    //     { x: 16.949999999999974, pdf: 0.12584172613764152 },
    //     { x: 17.059999999999974, pdf: 0.1259010231379035 },
    //     { x: 17.169999999999973, pdf: 0.12580864228215807 },
    //     { x: 17.279999999999973, pdf: 0.12556491730933672 },
    //     { x: 17.389999999999972, pdf: 0.12517072792622605 },
    //     { x: 17.49999999999997, pdf: 0.12462749451753433 },
    //     { x: 17.60999999999997, pdf: 0.12393716961919929 },
    //     { x: 17.71999999999997, pdf: 0.1231022262265693 },
    //     { x: 17.82999999999997, pdf: 0.12212564303543284 },
    //     { x: 17.93999999999997, pdf: 0.1210108867391587 },
    //     { x: 18.04999999999997, pdf: 0.11976189152917438 },
    //     { x: 18.159999999999968, pdf: 0.11838303596840025 },
    //     { x: 18.269999999999968, pdf: 0.11687911742784585 },
    //     { x: 18.379999999999967, pdf: 0.11525532429515117 },
    //     { x: 18.489999999999966, pdf: 0.11351720618024314 },
    //     { x: 18.599999999999966, pdf: 0.11167064235732105 },
    //     { x: 18.709999999999965, pdf: 0.10972180869396257 },
    //     { x: 18.819999999999965, pdf: 0.10767714332716188 },
    //     { x: 18.929999999999964, pdf: 0.10554331135251384 },
    //     { x: 19.039999999999964, pdf: 0.10332716879651553 },
    //     { x: 19.149999999999963, pdf: 0.1010357261430725 },
    //     { x: 19.259999999999962, pdf: 0.09867611168380674 },
    //     { x: 19.369999999999962, pdf: 0.09625553495773567 },
    //     { x: 19.47999999999996, pdf: 0.09378125053941684 },
    //     { x: 19.58999999999996, pdf: 0.0912605224258574 },
    //     { x: 19.69999999999996, pdf: 0.08870058926151618 },
    //     { x: 19.80999999999996, pdf: 0.0861086306277478 },
    //     { x: 19.91999999999996, pdf: 0.08349173460824426 },
    //     { x: 20.02999999999996, pdf: 0.08085686682562278 },
    //     { x: 20.139999999999958, pdf: 0.07821084112651096 },
    //     { x: 20.249999999999957, pdf: 0.0755602920735203 },
    //     { x: 20.359999999999957, pdf: 0.07291164938261302 },
    //     { x: 20.469999999999956, pdf: 0.07027111442379702 },
    //     { x: 20.579999999999956, pdf: 0.06764463888206981 },
    //     { x: 20.689999999999955, pdf: 0.06503790565431186 },
    //     { x: 20.799999999999955, pdf: 0.06245631203663879 },
    //     { x: 20.909999999999954, pdf: 0.05990495523578081 },
    //     { x: 21.019999999999953, pdf: 0.057388620217582655 },
    //     { x: 21.129999999999953, pdf: 0.054911769885907534 },
    //     { x: 21.239999999999952, pdf: 0.05247853756626619 },
    //     { x: 21.34999999999995, pdf: 0.050092721750548005 },
    //     { x: 21.45999999999995, pdf: 0.04775778304244922 },
    //     { x: 21.56999999999995, pdf: 0.045476843227705024 },
    //     { x: 21.67999999999995, pdf: 0.04325268637914335 },
    //     { x: 21.78999999999995, pdf: 0.04108776189397607 },
    //     { x: 21.89999999999995, pdf: 0.03898418934969129 },
    //     { x: 22.00999999999995, pdf: 0.03694376505545445 },
    //     { x: 22.119999999999948, pdf: 0.03496797016808652 },
    //     { x: 22.229999999999947, pdf: 0.03305798023546953 },
    //     { x: 22.339999999999947, pdf: 0.031214676025614625 },
    //     { x: 22.449999999999946, pdf: 0.029438655496583702 },
    //     { x: 22.559999999999945, pdf: 0.027730246760929483 },
    //     { x: 22.669999999999945, pdf: 0.026089521898245954 },
    //     { x: 22.779999999999944, pdf: 0.02451631147072182 },
    //     { x: 22.889999999999944, pdf: 0.023010219599172477 },
    //     ... 1 more item
    //   ]
    // }

    arr = [13.8, 19.5, 16.7, 14.3, 17.5, 14.5, 12.6, 15.6, 8.9, 13.3, 17.1, 15, 16.3, 18.3, 18.7, 16.7, 20.9, 12.3, 22.3, 14.6, 20.1, 16.7, 16.8, 24.2, 21.2, 20.7, 18.6, 18.3, 15.9, 17.2, 18.8, 16.3, 20.5, 14.7, 17.5, 24.1, 14.6, 21.1, 17, 19.6, 21.2, 16, 16.5, 9.3, 16.2, 14.9, 16.3, 13.9, 18.4, 19.2, 24.6, 20.2, 12.8, 12.9, 14.1, 18.5, 13.4, 17.1, 9.9, 21.9, 19.6, 18.3, 19.7, 16.6, 21.7, 11.8, 15.9, 11.4, 14.3, 17.4, 16.4, 20.7, 18.6, 22, 17.9, 16.3, 15.4, 17.2, 17.3, 18.3, 16.8, 20.9, 15, 15.1, 18.6, 17.5, 14.7, 17.4, 13.8, 18.3, 17.2, 13.4, 12.5, 22.8, 18.6, 16.3, 16.1, 15.7, 20.8, 16.4]
    opt = {
        dx: 1,
    }
    r = await arrNormHist(arr, opt)
    // r.bins = r.bins.map((v) => {
    //     delete v.arr
    //     return v
    // })
    // fs.writeFileSync('bins1.csv', w.getCsvStrFromData(r.bins), 'utf8')
    // fs.writeFileSync('curves1.csv', w.getCsvStrFromData(r.curves), 'utf8')
    console.log(r)
    // => {
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
    //     { x: 8, pdf: 0.0021354972114315455 },
    //     { x: 8.17, pdf: 0.0024854553367063114 },
    //     { x: 8.34, pdf: 0.002884449034450822 },
    //     { x: 8.51, pdf: 0.003337872380944044 },
    //     { x: 8.68, pdf: 0.0038514701648785558 },
    //     { x: 8.85, pdf: 0.004431321905571833 },
    //     { x: 9.02, pdf: 0.0050838182198556505 },
    //     { x: 9.19, pdf: 0.005815628799539062 },
    //     { x: 9.36, pdf: 0.006633661330116091 },
    //     { x: 9.53, pdf: 0.0075450107769740975 },
    //     { x: 9.7, pdf: 0.008556898589091914 },
    //     { x: 9.87, pdf: 0.009676601522769147 },
    //     { x: 10.04, pdf: 0.010911369969185285 },
    //     { x: 10.209999999999999, pdf: 0.01226833587853811 },
    //     { x: 10.379999999999999, pdf: 0.013754410608161986 },
    //     { x: 10.549999999999999, pdf: 0.015376173279331162 },
    //     { x: 10.719999999999999, pdf: 0.01713975050327831 },
    //     { x: 10.889999999999999, pdf: 0.01905068862608071 },
    //     { x: 11.059999999999999, pdf: 0.021113819938210935 },
    //     { x: 11.229999999999999, pdf: 0.023333124590469153 },
    //     { x: 11.399999999999999, pdf: 0.025711590245619025 },
    //     { x: 11.569999999999999, pdf: 0.028251071765571685 },
    //     { x: 11.739999999999998, pdf: 0.03095215347817955 },
    //     { x: 11.909999999999998, pdf: 0.03381401677618344 },
    //     { x: 12.079999999999998, pdf: 0.036834315964264425 },
    //     { x: 12.249999999999998, pdf: 0.04000906537955066 },
    //     { x: 12.419999999999998, pdf: 0.043332540858125594 },
    //     { x: 12.589999999999998, pdf: 0.04679719859796993 },
    //     { x: 12.759999999999998, pdf: 0.05039361437165339 },
    //     { x: 12.929999999999998, pdf: 0.0541104458660219 },
    //     { x: 13.099999999999998, pdf: 0.05793442066916147 },
    //     { x: 13.269999999999998, pdf: 0.06185035208737739 },
    //     { x: 13.439999999999998, pdf: 0.06584118455954233 },
    //     { x: 13.609999999999998, pdf: 0.06988806994820053 },
    //     { x: 13.779999999999998, pdf: 0.07397047543406945 },
    //     { x: 13.949999999999998, pdf: 0.07806632313332741 },
    //     { x: 14.119999999999997, pdf: 0.0821521609078912 },
    //     { x: 14.289999999999997, pdf: 0.08620336316240158 },
    //     { x: 14.459999999999997, pdf: 0.09019435973417045 },
    //     { x: 14.629999999999997, pdf: 0.09409889030150907 },
    //     { x: 14.799999999999997, pdf: 0.0978902810800305 },
    //     { x: 14.969999999999997, pdf: 0.10154173996430735 },
    //     { x: 15.139999999999997, pdf: 0.10502666572190945 },
    //     { x: 15.309999999999997, pdf: 0.10831896637561805 },
    //     { x: 15.479999999999997, pdf: 0.11139338153321302 },
    //     { x: 15.649999999999997, pdf: 0.11422580315622657 },
    //     { x: 15.819999999999997, pdf: 0.11679358911035241 },
    //     { x: 15.989999999999997, pdf: 0.11907586381860297 },
    //     { x: 16.159999999999997, pdf: 0.12105380044817005 },
    //     { x: 16.33, pdf: 0.12271087930392413 },
    //     { x: 16.5, pdf: 0.12403311747242914 },
    //     { x: 16.67, pdf: 0.1250092652532888 },
    //     { x: 16.840000000000003, pdf: 0.12563096551895458 },
    //     { x: 17.010000000000005, pdf: 0.12589287284579317 },
    //     { x: 17.180000000000007, pdf: 0.12579273004121988 },
    //     { x: 17.35000000000001, pdf: 0.12533140053453878 },
    //     { x: 17.52000000000001, pdf: 0.1245128559813781 },
    //     { x: 17.690000000000012, pdf: 0.12334411933061673 },
    //     { x: 17.860000000000014, pdf: 0.121835164495286 },
    //     { x: 18.030000000000015, pdf: 0.11999877463212202 },
    //     { x: 18.200000000000017, pdf: 0.11785036184618489 },
    //     { x: 18.37000000000002, pdf: 0.1154077518768104 },
    //     { x: 18.54000000000002, pdf: 0.11269093797091934 },
    //     { x: 18.710000000000022, pdf: 0.10972180869396155 },
    //     { x: 18.880000000000024, pdf: 0.10652385485533912 },
    //     { x: 19.050000000000026, pdf: 0.10312186102540377 },
    //     { x: 19.220000000000027, pdf: 0.09954158729019578 },
    //     { x: 19.39000000000003, pdf: 0.09580944692694326 },
    //     { x: 19.56000000000003, pdf: 0.09195218559069512 },
    //     { x: 19.730000000000032, pdf: 0.0879965673866187 },
    //     { x: 19.900000000000034, pdf: 0.08396907287302384 },
    //     { x: 20.070000000000036, pdf: 0.07989561360951453 },
    //     { x: 20.240000000000038, pdf: 0.07580126734763307 },
    //     { x: 20.41000000000004, pdf: 0.07171003737459185 },
    //     { x: 20.58000000000004, pdf: 0.06764463888206779 },
    //     { x: 20.750000000000043, pdf: 0.06362631456008193 },
    //     { x: 20.920000000000044, pdf: 0.05967468092925172 },
    //     { x: 21.090000000000046, pdf: 0.055807606241205086 },
    //     { x: 21.260000000000048, pdf: 0.05204112011363684 },
    //     { x: 21.43000000000005, pdf: 0.048389354438805716 },
    //     { x: 21.60000000000005, pdf: 0.04486451452574493 },
    //     { x: 21.770000000000053, pdf: 0.04147687891841765 },
    //     { x: 21.940000000000055, pdf: 0.03823482588341427 },
    //     { x: 22.110000000000056, pdf: 0.03514488418795729 },
    //     { x: 22.280000000000058, pdf: 0.03221180549581274 },
    //     { x: 22.45000000000006, pdf: 0.0294386554965819 },
    //     { x: 22.62000000000006, pdf: 0.026826920751808408 },
    //     { x: 22.790000000000063, pdf: 0.024376628186298006 },
    //     { x: 22.960000000000065, pdf: 0.022086474170060474 },
    //     { x: 23.130000000000067, pdf: 0.01995396021882945 },
    //     { x: 23.300000000000068, pdf: 0.01797553248144704 },
    //     { x: 23.47000000000007, pdf: 0.016146722371868524 },
    //     { x: 23.64000000000007, pdf: 0.014462285932951442 },
    //     { x: 23.810000000000073, pdf: 0.012916339779114184 },
    //     { x: 23.980000000000075, pdf: 0.011502491746033568 },
    //     { x: 24.150000000000077, pdf: 0.01021396466879877 },
    //     { x: 24.32000000000008, pdf: 0.0090437120069321 },
    //     { x: 24.49000000000008, pdf: 0.007984524327785068 },
    //     { x: 24.660000000000082, pdf: 0.007029125942297158 },
    //     { x: 24.830000000000084, pdf: 0.006170261253265365 },
    //     ... 1 more item
    //   ]
    // }

}
test()
    .catch((err) => {
        console.log(err)
    })

//node --experimental-modules g.arrNormHist.mjs
