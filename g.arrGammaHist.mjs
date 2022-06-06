import arrGammaHist from './src/arrGammaHist.mjs'
// import fs from 'fs'
// import w from 'wsemi'

async function test() {

    let arr
    let r

    arr = [13.8, 19.5, 16.7, 14.3, 17.5, 14.5, 12.6, 15.6, 8.9, 13.3, 17.1, 15, 16.3, 18.3, 18.7, 16.7, 20.9, 12.3, 22.3, 14.6, 20.1, 16.7, 16.8, 24.2, 21.2, 20.7, 18.6, 18.3, 15.9, 17.2, 18.8, 16.3, 20.5, 14.7, 17.5, 24.1, 14.6, 21.1, 17, 19.6, 21.2, 16, 16.5, 9.3, 16.2, 14.9, 16.3, 13.9, 18.4, 19.2, 24.6, 20.2, 12.8, 12.9, 14.1, 18.5, 13.4, 17.1, 9.9, 21.9, 19.6, 18.3, 19.7, 16.6, 21.7, 11.8, 15.9, 11.4, 14.3, 17.4, 16.4, 20.7, 18.6, 22, 17.9, 16.3, 15.4, 17.2, 17.3, 18.3, 16.8, 20.9, 15, 15.1, 18.6, 17.5, 14.7, 17.4, 13.8, 18.3, 17.2, 13.4, 12.5, 22.8, 18.6, 16.3, 16.1, 15.7, 20.8, 16.4]
    r = await arrGammaHist(arr, {
        n: 10,
        min: 12,
        max: 23,
    })
    console.log(r)
    // => {
    //   shape: 41.862667266933435,
    //   scale: 0.40489689983921096,
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
    //     { x: 12, pdf: 0.02302799811211419 },
    //     { x: 12.11, pdf: 0.025480278410678812 },
    //     { x: 12.219999999999999, pdf: 0.02809880603927179 },
    //     { x: 12.329999999999998, pdf: 0.030883998443851906 },
    //     { x: 12.439999999999998, pdf: 0.03383503891873299 },
    //     { x: 12.549999999999997, pdf: 0.036949810230040576 },
    //     { x: 12.659999999999997, pdf: 0.04022484106502993 },
    //     { x: 12.769999999999996, pdf: 0.04365526659209952 },
    //     { x: 12.879999999999995, pdf: 0.04723480421275089 },
    //     { x: 12.989999999999995, pdf: 0.05095574535863021 },
    //     { x: 13.099999999999994, pdf: 0.054808963939032576 },
    //     { x: 13.209999999999994, pdf: 0.058783941781785504 },
    //     { x: 13.319999999999993, pdf: 0.06286881113893909 },
    //     { x: 13.429999999999993, pdf: 0.06705041405365225 },
    //     { x: 13.539999999999992, pdf: 0.07131437811186618 },
    //     { x: 13.649999999999991, pdf: 0.07564520783730938 },
    //     { x: 13.759999999999991, pdf: 0.08002639073636147 },
    //     { x: 13.86999999999999, pdf: 0.08444051676537716 },
    //     { x: 13.97999999999999, pdf: 0.08886940978156871 },
    //     { x: 14.08999999999999, pdf: 0.09329426935332652 },
    //     { x: 14.199999999999989, pdf: 0.09769582115037626 },
    //     { x: 14.309999999999988, pdf: 0.10205447401060697 },
    //     { x: 14.419999999999987, pdf: 0.10635048169075328 },
    //     { x: 14.529999999999987, pdf: 0.11056410725340604 },
    //     { x: 14.639999999999986, pdf: 0.11467578802300739 },
    //     { x: 14.749999999999986, pdf: 0.11866629905856398 },
    //     { x: 14.859999999999985, pdf: 0.12251691313903193 },
    //     { x: 14.969999999999985, pdf: 0.12620955533742986 },
    //     { x: 15.079999999999984, pdf: 0.1297269503687561 },
    //     { x: 15.189999999999984, pdf: 0.13305276103243538 },
    //     { x: 15.299999999999983, pdf: 0.1361717162284293 },
    //     { x: 15.409999999999982, pdf: 0.1390697272040856 },
    //     { x: 15.519999999999982, pdf: 0.14173399088233068 },
    //     { x: 15.629999999999981, pdf: 0.14415307932680127 },
    //     { x: 15.73999999999998, pdf: 0.14631701461227037 },
    //     { x: 15.84999999999998, pdf: 0.14821732858487816 },
    //     { x: 15.95999999999998, pdf: 0.14984710721280786 },
    //     { x: 16.06999999999998, pdf: 0.1512010194402793 },
    //     { x: 16.17999999999998, pdf: 0.1522753306624951 },
    //     { x: 16.289999999999978, pdf: 0.15306790113405633 },
    //     { x: 16.399999999999977, pdf: 0.1535781698048584 },
    //     { x: 16.509999999999977, pdf: 0.15380712424377135 },
    //     { x: 16.619999999999976, pdf: 0.15375725745961144 },
    //     { x: 16.729999999999976, pdf: 0.15343251255911727 },
    //     { x: 16.839999999999975, pdf: 0.1528382162923602 },
    //     { x: 16.949999999999974, pdf: 0.15198100262605344 },
    //     { x: 17.059999999999974, pdf: 0.15086872755481412 },
    //     { x: 17.169999999999973, pdf: 0.14951037640926734 },
    //     { x: 17.279999999999973, pdf: 0.1479159649488449 },
    //     { x: 17.389999999999972, pdf: 0.14609643553659307 },
    //     { x: 17.49999999999997, pdf: 0.14406354968478483 },
    //     { x: 17.60999999999997, pdf: 0.14182977823446635 },
    //     { x: 17.71999999999997, pdf: 0.1394081903911127 },
    //     { x: 17.82999999999997, pdf: 0.13681234278377832 },
    //     { x: 17.93999999999997, pdf: 0.13405616964819692 },
    //     { x: 18.04999999999997, pdf: 0.13115387515735438 },
    //     { x: 18.159999999999968, pdf: 0.12811982883742365 },
    //     { x: 18.269999999999968, pdf: 0.12496846491513337 },
    //     { x: 18.379999999999967, pdf: 0.12171418634575974 },
    //     { x: 18.489999999999966, pdf: 0.11837127417131899 },
    //     { x: 18.599999999999966, pdf: 0.11495380275742022 },
    //     { x: 18.709999999999965, pdf: 0.1114755613563913 },
    //     { x: 18.819999999999965, pdf: 0.10794998234502629 },
    //     { x: 18.929999999999964, pdf: 0.10439007638893252 },
    //     { x: 19.039999999999964, pdf: 0.10080837469297518 },
    //     { x: 19.149999999999963, pdf: 0.09721687841002394 },
    //     { x: 19.259999999999962, pdf: 0.09362701519831537 },
    //     { x: 19.369999999999962, pdf: 0.09004960284261831 },
    //     { x: 19.47999999999996, pdf: 0.08649481978590993 },
    //     { x: 19.58999999999996, pdf: 0.08297218235706977 },
    //     { x: 19.69999999999996, pdf: 0.07949052842649137 },
    //     { x: 19.80999999999996, pdf: 0.07605800717522741 },
    //     { x: 19.91999999999996, pdf: 0.07268207462461201 },
    //     { x: 20.02999999999996, pdf: 0.0693694945419408 },
    //     { x: 20.139999999999958, pdf: 0.06612634431351411 },
    //     { x: 20.249999999999957, pdf: 0.06295802535887669 },
    //     { x: 20.359999999999957, pdf: 0.05986927764897514 },
    //     { x: 20.469999999999956, pdf: 0.05686419788585834 },
    //     { x: 20.579999999999956, pdf: 0.053946260901825124 },
    //     { x: 20.689999999999955, pdf: 0.05111834384130961 },
    //     { x: 20.799999999999955, pdf: 0.04838275269841054 },
    //     { x: 20.909999999999954, pdf: 0.04574125079669818 },
    //     { x: 21.019999999999953, pdf: 0.04319508881478855 },
    //     { x: 21.129999999999953, pdf: 0.04074503598103203 },
    //     { x: 21.239999999999952, pdf: 0.03839141208265921 },
    //     { x: 21.34999999999995, pdf: 0.036134119958656466 },
    //     { x: 21.45999999999995, pdf: 0.0339726781708081 },
    //     { x: 21.56999999999995, pdf: 0.03190625357343621 },
    //     { x: 21.67999999999995, pdf: 0.029933693528990873 },
    //     { x: 21.78999999999995, pdf: 0.028053557543293264 },
    //     { x: 21.89999999999995, pdf: 0.0262641481207874 },
    //     { x: 22.00999999999995, pdf: 0.02456354066610146 },
    //     { x: 22.119999999999948, pdf: 0.02294961228350062 },
    //     { x: 22.229999999999947, pdf: 0.021420069350040108 },
    //     { x: 22.339999999999947, pdf: 0.01997247376135949 },
    //     { x: 22.449999999999946, pdf: 0.018604267770862354 },
    //     { x: 22.559999999999945, pdf: 0.01731279736340427 },
    //     { x: 22.669999999999945, pdf: 0.016095334123533256 },
    //     { x: 22.779999999999944, pdf: 0.014949095575644618 },
    //     { x: 22.889999999999944, pdf: 0.013871263989191163 },
    //     ... 1 more item
    //   ]
    // }

    arr = [13.8, 19.5, 16.7, 14.3, 17.5, 14.5, 12.6, 15.6, 8.9, 13.3, 17.1, 15, 16.3, 18.3, 18.7, 16.7, 20.9, 12.3, 22.3, 14.6, 20.1, 16.7, 16.8, 24.2, 21.2, 20.7, 18.6, 18.3, 15.9, 17.2, 18.8, 16.3, 20.5, 14.7, 17.5, 24.1, 14.6, 21.1, 17, 19.6, 21.2, 16, 16.5, 9.3, 16.2, 14.9, 16.3, 13.9, 18.4, 19.2, 24.6, 20.2, 12.8, 12.9, 14.1, 18.5, 13.4, 17.1, 9.9, 21.9, 19.6, 18.3, 19.7, 16.6, 21.7, 11.8, 15.9, 11.4, 14.3, 17.4, 16.4, 20.7, 18.6, 22, 17.9, 16.3, 15.4, 17.2, 17.3, 18.3, 16.8, 20.9, 15, 15.1, 18.6, 17.5, 14.7, 17.4, 13.8, 18.3, 17.2, 13.4, 12.5, 22.8, 18.6, 16.3, 16.1, 15.7, 20.8, 16.4]
    r = await arrGammaHist(arr, {
        dx: 1,
    })
    console.log(r)
    // => {
    //   shape: 32.70536130686112,
    //   scale: 0.5274681258905096,
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
    //     { x: 8, pdf: 0.00014332553789385104 },
    //     { x: 8.17, pdf: 0.00020224997853443962 },
    //     { x: 8.34, pdf: 0.000281507771261562 },
    //     { x: 8.51, pdf: 0.0003866962507451346 },
    //     { x: 8.68, pdf: 0.0005245097780820164 },
    //     { x: 8.85, pdf: 0.0007028367837364976 },
    //     { x: 9.02, pdf: 0.0009308370972138259 },
    //     { x: 9.19, pdf: 0.0012189923168135798 },
    //     { x: 9.36, pdf: 0.0015791219843512702 },
    //     { x: 9.53, pdf: 0.0020243587268685254 },
    //     { x: 9.7, pdf: 0.0025690763335211707 },
    //     { x: 9.87, pdf: 0.0032287659507754126 },
    //     { x: 10.04, pdf: 0.004019857177099289 },
    //     { x: 10.209999999999999, pdf: 0.004959482768576656 },
    //     { x: 10.379999999999999, pdf: 0.006065187854971231 },
    //     { x: 10.549999999999999, pdf: 0.007354586917655748 },
    //     { x: 10.719999999999999, pdf: 0.008844974187709622 },
    //     { x: 10.889999999999999, pdf: 0.010552895467050355 },
    //     { x: 11.059999999999999, pdf: 0.012493691538657656 },
    //     { x: 11.229999999999999, pdf: 0.01468102519999112 },
    //     { x: 11.399999999999999, pdf: 0.017126405424791224 },
    //     { x: 11.569999999999999, pdf: 0.019838723148664382 },
    //     { x: 11.739999999999998, pdf: 0.022823813622050625 },
    //     { x: 11.909999999999998, pdf: 0.026084060145224984 },
    //     { x: 12.079999999999998, pdf: 0.029618053286847478 },
    //     { x: 12.249999999999998, pdf: 0.03342031841112597 },
    //     { x: 12.419999999999998, pdf: 0.03748112254656629 },
    //     { x: 12.589999999999998, pdf: 0.041786369392849625 },
    //     { x: 12.759999999999998, pdf: 0.046317588672642296 },
    //     { x: 12.929999999999998, pdf: 0.051052023197741186 },
    //     { x: 13.099999999999998, pdf: 0.05596281404860678 },
    //     { x: 13.269999999999998, pdf: 0.06101928128094017 },
    //     { x: 13.439999999999998, pdf: 0.06618729468815086 },
    //     { x: 13.609999999999998, pdf: 0.07142972647194762 },
    //     { x: 13.779999999999998, pdf: 0.07670697530052513 },
    //     { x: 13.949999999999998, pdf: 0.08197754924425596 },
    //     { x: 14.119999999999997, pdf: 0.0871986935331239 },
    //     { x: 14.289999999999997, pdf: 0.09232704801872874 },
    //     { x: 14.459999999999997, pdf: 0.09731931866590132 },
    //     { x: 14.629999999999997, pdf: 0.10213294734365083 },
    //     { x: 14.799999999999997, pdf: 0.10672676461210548 },
    //     { x: 14.969999999999997, pdf: 0.11106161107399984 },
    //     { x: 15.139999999999997, pdf: 0.11510091412460424 },
    //     { x: 15.309999999999997, pdf: 0.11881120852985595 },
    //     { x: 15.479999999999997, pdf: 0.12216259111846588 },
    //     { x: 15.649999999999997, pdf: 0.12512910191468402 },
    //     { x: 15.819999999999997, pdf: 0.1276890261879987 },
    //     { x: 15.989999999999997, pdf: 0.1298251140800084 },
    //     { x: 16.159999999999997, pdf: 0.13152471661696286 },
    //     { x: 16.33, pdf: 0.13277983896602855 },
    //     { x: 16.5, pdf: 0.13358711368910212 },
    //     { x: 16.67, pdf: 0.13394769844544743 },
    //     { x: 16.840000000000003, pdf: 0.1338671040581021 },
    //     { x: 17.010000000000005, pdf: 0.133354960065694 },
    //     { x: 17.180000000000007, pdf: 0.13242472581648632 },
    //     { x: 17.35000000000001, pdf: 0.13109335582199041 },
    //     { x: 17.52000000000001, pdf: 0.1293809284781201 },
    //     { x: 17.690000000000012, pdf: 0.12731024739573943 },
    //     { x: 17.860000000000014, pdf: 0.12490642447901963 },
    //     { x: 18.030000000000015, pdf: 0.12219645357442656 },
    //     { x: 18.200000000000017, pdf: 0.11920878301335368 },
    //     { x: 18.37000000000002, pdf: 0.11597289471927445 },
    //     { x: 18.54000000000002, pdf: 0.11251889677732355 },
    //     { x: 18.710000000000022, pdf: 0.10887713550320813 },
    //     { x: 18.880000000000024, pdf: 0.10507783213029712 },
    //     { x: 19.050000000000026, pdf: 0.10115074828803483 },
    //     { x: 19.220000000000027, pdf: 0.09712488349853689 },
    //     { x: 19.39000000000003, pdf: 0.09302820699473771 },
    //     { x: 19.56000000000003, pdf: 0.08888742528362488 },
    //     { x: 19.730000000000032, pdf: 0.08472778605828504 },
    //     { x: 19.900000000000034, pdf: 0.0805729183161166 },
    //     { x: 20.070000000000036, pdf: 0.07644470787718427 },
    //     { x: 20.240000000000038, pdf: 0.07236320692242379 },
    //     { x: 20.41000000000004, pdf: 0.06834657568948849 },
    //     { x: 20.58000000000004, pdf: 0.06441105407478948 },
    //     { x: 20.750000000000043, pdf: 0.0605709605914285 },
    //     { x: 20.920000000000044, pdf: 0.056838715920418795 },
    //     { x: 21.090000000000046, pdf: 0.05322488816071217 },
    //     { x: 21.260000000000048, pdf: 0.049738256825347556 },
    //     { x: 21.43000000000005, pdf: 0.04638589263830479 },
    //     { x: 21.60000000000005, pdf: 0.04317325025108245 },
    //     { x: 21.770000000000053, pdf: 0.04010427111078825 },
    //     { x: 21.940000000000055, pdf: 0.03718149386385041 },
    //     { x: 22.110000000000056, pdf: 0.03440616986303285 },
    //     { x: 22.280000000000058, pdf: 0.03177838155200582 },
    //     { x: 22.45000000000006, pdf: 0.02929716172397888 },
    //     { x: 22.62000000000006, pdf: 0.026960611882019054 },
    //     { x: 22.790000000000063, pdf: 0.024766018162590577 },
    //     { x: 22.960000000000065, pdf: 0.022709963515407904 },
    //     { x: 23.130000000000067, pdf: 0.0207884350574309 },
    //     { x: 23.300000000000068, pdf: 0.01899692573313812 },
    //     { x: 23.47000000000007, pdf: 0.017330529614226743 },
    //     { x: 23.64000000000007, pdf: 0.0157840303574944 },
    //     { x: 23.810000000000073, pdf: 0.014351982508322985 },
    //     { x: 23.980000000000075, pdf: 0.013028785488079692 },
    //     { x: 24.150000000000077, pdf: 0.011808750236435177 },
    //     { x: 24.32000000000008, pdf: 0.010686158594225798 },
    //     { x: 24.49000000000008, pdf: 0.009655315609437191 },
    //     { x: 24.660000000000082, pdf: 0.008710595028962709 },
    //     { x: 24.830000000000084, pdf: 0.007846478302979876 },
    //     ... 1 more item
    //   ]
    // }

    arr = [12, 36, 9, 13, 6, 17, 7, 12, 31, 57, 44, 32, 16, 11, 10, 38, 31, 28, 26, 7, 16, 16, 16, 13, 7, 8, 12, 17, 11, 20, 7, 6, 14, 7, 37, 11, 7, 8, 8, 32, 29, 52, 20, 6, 11, 12, 33, 48, 10, 27, 11, 24, 17, 11, 23, 20, 13, 16, 16, 17, 13, 15, 13, 26, 11, 13, 29, 18, 18, 13, 11, 12, 9, 17, 19, 14, 19, 9, 37, 32, 14, 20, 13, 22, 12, 14, 33, 15, 20, 37, 24, 19, 15, 15, 5, 11, 13, 60, 39, 17, 6, 18, 40, 21, 18, 17, 12, 12, 10, 39, 27, 10, 8, 44, 36, 18, 11, 8, 13, 9, 25, 11, 10, 55, 54, 13, 8, 19, 38, 9, 17, 14, 9, 12, 54, 22, 11, 19, 50, 18, 12, 40, 52, 12, 15, 7, 12, 15, 18, 19, 11, 43, 23, 14, 25, 32, 23, 15, 12, 20, 14, 10, 12, 24, 50, 40, 16, 14, 9, 27, 9, 11, 17, 19, 12, 17, 14, 5, 24, 22, 60, 20, 9, 11, 11, 6, 7, 8, 31, 10, 12, 9, 11, 26, 14, 7, 14, 57, 19, 9, 10, 9, 19, 19, 15, 21, 48, 23, 26, 14, 46, 51, 10, 10, 9, 7, 19, 46, 27, 18, 12, 10, 36, 15, 5, 11, 13, 21, 15, 15, 16, 29, 44, 42, 7, 14, 9, 6, 22, 24, 18, 39, 7, 50, 33, 11, 20, 17, 18, 48, 8, 21, 20, 12, 41, 11, 18, 11, 58, 18, 21, 23, 12, 67, 35]
    r = await arrGammaHist(arr, {
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
    //   shape: 3.8362965388539396,
    //   scale: 4.074897568773075,
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
    //     { x: 1, pdf: 0.0007282975170685335 },
    //     { x: 1.69, pdf: 0.0027234805159131715 },
    //     { x: 2.38, pdf: 0.006071766934015465 },
    //     { x: 3.07, pdf: 0.010552642679758695 },
    //     { x: 3.76, pdf: 0.01583276661510885 },
    //     { x: 4.449999999999999, pdf: 0.0215553928874282 },
    //     { x: 5.139999999999999, pdf: 0.027389120921740027 },
    //     { x: 5.829999999999998, pdf: 0.033052179545322684 },
    //     { x: 6.519999999999998, pdf: 0.038321794774499054 },
    //     { x: 7.209999999999997, pdf: 0.043034642234035025 },
    //     { x: 7.899999999999997, pdf: 0.047082244563450004 },
    //     { x: 8.589999999999996, pdf: 0.050403801934609416 },
    //     { x: 9.279999999999996, pdf: 0.0529780374842222 },
    //     { x: 9.969999999999995, pdf: 0.0548150333627275 },
    //     { x: 10.659999999999995, pdf: 0.055948627362856496 },
    //     { x: 11.349999999999994, pdf: 0.05642967069951994 },
    //     { x: 12.039999999999994, pdf: 0.05632027176164147 },
    //     { x: 12.729999999999993, pdf: 0.05568903933266917 },
    //     { x: 13.419999999999993, pdf: 0.0546072715904164 },
    //     { x: 14.109999999999992, pdf: 0.05314599994206301 },
    //     { x: 14.799999999999992, pdf: 0.05137377945105818 },
    //     { x: 15.489999999999991, pdf: 0.04935511327581235 },
    //     { x: 16.179999999999993, pdf: 0.04714940229023086 },
    //     { x: 16.869999999999994, pdf: 0.04481031952853663 },
    //     { x: 17.559999999999995, pdf: 0.04238552000398246 },
    //     { x: 18.249999999999996, pdf: 0.039916608271840834 },
    //     { x: 18.939999999999998, pdf: 0.03743929786236238 },
    //     { x: 19.63, pdf: 0.03498370779997584 },
    //     { x: 20.32, pdf: 0.03257475151448144 },
    //     { x: 21.01, pdf: 0.03023258238049672 },
    //     { x: 21.700000000000003, pdf: 0.027973067853289582 },
    //     { x: 22.390000000000004, pdf: 0.02580827073799144 },
    //     { x: 23.080000000000005, pdf: 0.0237469216157914 },
    //     { x: 23.770000000000007, pdf: 0.021794870960125827 },
    //     { x: 24.460000000000008, pdf: 0.019955513123265458 },
    //     { x: 25.15000000000001, pdf: 0.0182301772750525 },
    //     { x: 25.84000000000001, pdf: 0.01661848264175338 },
    //     { x: 26.530000000000012, pdf: 0.015118657126440931 },
    //     { x: 27.220000000000013, pdf: 0.013727819685058472 },
    //     { x: 27.910000000000014, pdf: 0.012442227765434513 },
    //     { x: 28.600000000000016, pdf: 0.011257491760255083 },
    //     { x: 29.290000000000017, pdf: 0.01016875883929291 },
    //     { x: 29.980000000000018, pdf: 0.00917086876153211 },
    //     { x: 30.67000000000002, pdf: 0.008258484366212003 },
    //     { x: 31.36000000000002, pdf: 0.0074261994377717785 },
    //     { x: 32.05000000000002, pdf: 0.006668626561253615 },
    //     { x: 32.740000000000016, pdf: 0.005980467454413214 },
    //     { x: 33.430000000000014, pdf: 0.005356568098399894 },
    //     { x: 34.12000000000001, pdf: 0.004791960804290024 },
    //     { x: 34.81000000000001, pdf: 0.00428189515862669 },
    //     { x: 35.50000000000001, pdf: 0.0038218595954222574 },
    //     { x: 36.190000000000005, pdf: 0.0034075951506506164 },
    //     { x: 36.88, pdf: 0.003035102772206833 },
    //     { x: 37.57, pdf: 0.0027006453863911437 },
    //     { x: 38.26, pdf: 0.002400745762870409 },
    //     { x: 38.949999999999996, pdf: 0.0021321810746536413 },
    //     { x: 39.63999999999999, pdf: 0.0018919749181457639 },
    //     { x: 40.32999999999999, pdf: 0.001677387440620762 },
    //     { x: 41.01999999999999, pdf: 0.0014859041179650714 },
    //     { x: 41.70999999999999, pdf: 0.00131522363354999 },
    //     { x: 42.399999999999984, pdf: 0.001163245228725382 },
    //     { x: 43.08999999999998, pdf: 0.0010280558257370965 },
    //     { x: 43.77999999999998, pdf: 0.0009079171638795195 },
    //     { x: 44.46999999999998, pdf: 0.0008012531384298941 },
    //     { x: 45.159999999999975, pdf: 0.0007066374884296101 },
    //     { x: 45.84999999999997, pdf: 0.0006227819427848269 },
    //     { x: 46.53999999999997, pdf: 0.0005485249036169607 },
    //     { x: 47.22999999999997, pdf: 0.0004828207205311969 },
    //     { x: 47.919999999999966, pdf: 0.0004247295887831485 },
    //     { x: 48.609999999999964, pdf: 0.0003734080875739536 },
    //     { x: 49.29999999999996, pdf: 0.0003281003613217577 },
    //     { x: 49.98999999999996, pdf: 0.0002881299362360558 },
    //     { x: 50.67999999999996, pdf: 0.00025289215641311185 },
    //     { x: 51.369999999999955, pdf: 0.00022184721758343912 },
    //     { x: 52.05999999999995, pdf: 0.0001945137722344422 },
    //     { x: 52.74999999999995, pdf: 0.00017046307680681344 },
    //     { x: 53.43999999999995, pdf: 0.0001493136497676458 },
    //     { x: 54.129999999999946, pdf: 0.00013072640837853575 },
    //     { x: 54.81999999999994, pdf: 0.00011440025171805934 },
    //     { x: 55.50999999999994, pdf: 0.00010006805782841466 },
    //     { x: 56.19999999999994, pdf: 0.000087493063604322 },
    //     { x: 56.88999999999994, pdf: 0.00007646559711898965 },
    //     { x: 57.579999999999934, pdf: 0.00006680013339645442 },
    //     { x: 58.26999999999993, pdf: 0.0000583326461175451 },
    //     { x: 58.95999999999993, pdf: 0.00005091822932767277 },
    //     { x: 59.64999999999993, pdf: 0.000044428964850023644 },
    //     { x: 60.339999999999925, pdf: 0.00003875201275893078 },
    //     { x: 61.02999999999992, pdf: 0.00003378790390507901 },
    //     { x: 61.71999999999992, pdf: 0.000029449015083618052 },
    //     { x: 62.40999999999992, pdf: 0.00002565820898094226 },
    //     { x: 63.099999999999916, pdf: 0.00002234762251336488 },
    //     { x: 63.789999999999914, pdf: 0.00001945758857262905 },
    //     { x: 64.47999999999992, pdf: 0.00001693567751379877 },
    //     { x: 65.16999999999992, pdf: 0.000014735845957753667 },
    //     { x: 65.85999999999991, pdf: 0.000012817681632476167 },
    //     { x: 66.54999999999991, pdf: 0.000011145734045350188 },
    //     { x: 67.23999999999991, pdf: 0.000009688921764758239 },
    //     { x: 67.92999999999991, pdf: 0.000008420007996238234 },
    //     { x: 68.6199999999999, pdf: 0.000007315136969845585 },
    //     { x: 69.3099999999999, pdf: 0.000006353424415099173 },
    //     ... 1 more item
    //   ]
    // }

}
test()
    .catch((err) => {
        console.log(err)
    })

//node --experimental-modules --es-module-specifier-resolution=node g.arrGammaHist.mjs
