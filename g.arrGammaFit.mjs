import arrGammaFit from './src/arrGammaFit.mjs'

async function test() {

    let arr
    let r

    arr = [12, 36, 9, 13, 6, 17, 7, 12, 31, 57, 44, 32, 16, 11, 10, 38, 31, 28, 26, 7, 16, 16, 16, 13, 7, 8, 12, 17, 11, 20, 7, 6, 14, 7, 37, 11, 7, 8, 8, 32, 29, 52, 20, 6, 11, 12, 33, 48, 10, 27, 11, 24, 17, 11, 23, 20, 13, 16, 16, 17, 13, 15, 13, 26, 11, 13, 29, 18, 18, 13, 11, 12, 9, 17, 19, 14, 19, 9, 37, 32, 14, 20, 13, 22, 12, 14, 33, 15, 20, 37, 24, 19, 15, 15, 5, 11, 13, 60, 39, 17, 6, 18, 40, 21, 18, 17, 12, 12, 10, 39, 27, 10, 8, 44, 36, 18, 11, 8, 13, 9, 25, 11, 10, 55, 54, 13, 8, 19, 38, 9, 17, 14, 9, 12, 54, 22, 11, 19, 50, 18, 12, 40, 52, 12, 15, 7, 12, 15, 18, 19, 11, 43, 23, 14, 25, 32, 23, 15, 12, 20, 14, 10, 12, 24, 50, 40, 16, 14, 9, 27, 9, 11, 17, 19, 12, 17, 14, 5, 24, 22, 60, 20, 9, 11, 11, 6, 7, 8, 31, 10, 12, 9, 11, 26, 14, 7, 14, 57, 19, 9, 10, 9, 19, 19, 15, 21, 48, 23, 26, 14, 46, 51, 10, 10, 9, 7, 19, 46, 27, 18, 12, 10, 36, 15, 5, 11, 13, 21, 15, 15, 16, 29, 44, 42, 7, 14, 9, 6, 22, 24, 18, 39, 7, 50, 33, 11, 20, 17, 18, 48, 8, 21, 20, 12, 41, 11, 18, 11, 58, 18, 21, 23, 12, 67, 35]
    r = await arrGammaFit(arr, {
        n: 69,
        min: 1,
        max: 70,
    })
    console.log(r)
    // => {
    //   shape: 3.8362965388539396,
    //   scale: 4.074897568773075,
    //   arrPdf: [
    //     [ 1.5, 0, 0.002034542900938358 ],
    //     [ 2.5, 0, 0.006778251528074013 ],
    //     [ 3.5, 0, 0.013772161615714786 ],
    //     [ 4.5, 0.011320754716981131, 0.02197810173523445 ],
    //     [ 5.5, 0.022641509433962263, 0.030380569392341527 ],
    //     [ 6.5, 0.045283018867924525, 0.03817623569640994 ],
    //     [ 7.5, 0.03018867924528302, 0.044821355259143096 ],
    //     [ 8.5, 0.052830188679245285, 0.05001282903727686 ],
    //     [ 9.5, 0.04150943396226415, 0.053642598229888455 ],
    //     [ 10.5, 0.07924528301886792, 0.05574595886606071 ],
    //     [ 11.5, 0.07169811320754717, 0.05645381775460518 ],
    //     [ 12.5, 0.045283018867924525, 0.05595305000100274 ],
    //     [ 13.5, 0.04905660377358491, 0.05445596204835303 ],
    //     [ 14.5, 0.04150943396226415, 0.05217827444112463 ],
    //     [ 15.5, 0.03018867924528302, 0.04932434550769117 ],
    //     [ 16.5, 0.04150943396226415, 0.04607816130381367 ],
    //     [ 17.5, 0.045283018867924525, 0.04259868048491963 ],
    //     [ 18.5, 0.04150943396226415, 0.03901830570786497 ],
    //     [ 19.5, 0.033962264150943396, 0.03544347629738162 ],
    //     [ 20.5, 0.018867924528301886, 0.031956597426761706 ],
    //     [ 21.5, 0.01509433962264151, 0.028618718038250914 ],
    //     [ 22.5, 0.018867924528301886, 0.025472535008409646 ],
    //     [ 23.5, 0.018867924528301886, 0.0225454335944075 ],
    //     [ 24.5, 0.007547169811320755, 0.019852376582105462 ],
    //     [ 25.5, 0.01509433962264151, 0.017398531002249633 ],
    //     [ 26.5, 0.01509433962264151, 0.0151815764197815 ],
    //     [ 27.5, 0.0037735849056603774, 0.013193677058112446 ],
    //     [ 28.5, 0.011320754716981131, 0.011423125308268597 ],
    //     [ 29.5, 0, 0.009855679783012123 ],
    //     [ 30.5, 0.011320754716981131, 0.008475629675587867 ],
    //     [ 31.5, 0.01509433962264151, 0.007266620869423741 ],
    //     [ 32.5, 0.011320754716981131, 0.006212279625757307 ],
    //     [ 33.5, 0, 0.005296667950862123 ],
    //     [ 34.5, 0.0037735849056603774, 0.004504601786645908 ],
    //     [ 35.5, 0.011320754716981131, 0.0038218595954222644 ],
    //     [ 36.5, 0.011320754716981131, 0.0032353051434718273 ],
    //     [ 37.5, 0.007547169811320755, 0.0027329446040823616 ],
    //     [ 38.5, 0.011320754716981131, 0.0023039346675539146 ],
    //     [ 39.5, 0.011320754716981131, 0.001938555255357194 ],
    //     [ 40.5, 0.0037735849056603774, 0.0016281577276447906 ],
    //     [ 41.5, 0.0037735849056603774, 0.0013650971518721555 ],
    //     [ 42.5, 0.0037735849056603774, 0.0011426552473936045 ],
    //     [ 43.5, 0.011320754716981131, 0.000954959005617501 ],
    //     [ 44.5, 0, 0.0007968986702454505 ],
    //     [ 45.5, 0.007547169811320755, 0.0006640477078460918 ],
    //     [ 46.5, 0, 0.0005525865668975019 ],
    //     [ 47.5, 0.011320754716981131, 0.0004592313773931834 ],
    //     [ 48.5, 0, 0.00038116825056312947 ],
    //     [ 49.5, 0.011320754716981131, 0.0003159934705381866 ],
    //     [ 50.5, 0.0037735849056603774, 0.00026165960216326697 ],
    //     [ 51.5, 0.007547169811320755, 0.00021642735070210298 ],
    //     [ 52.5, 0, 0.00017882288240340192 ],
    //     [ 53.5, 0.007547169811320755, 0.00014760023544158093 ],
    //     [ 54.5, 0.0037735849056603774, 0.00012170840693236135 ],
    //     [ 55.5, 0, 0.0001002626841944302 ],
    //     [ 56.5, 0.007547169811320755, 0.00008251978977290701 ],
    //     [ 57.5, 0.0037735849056603774, 0.00006785642416854554 ],
    //     [ 58.5, 0, 0.000055750813268511874 ],
    //     [ 59.5, 0.007547169811320755, 0.00004576689576865875 ],
    //     [ 60.5, 0, 0.000037540816896368505 ],
    //     [ 61.5, 0, 0.00003076942665494607 ],
    //     [ 62.5, 0, 0.000025200512318922518 ],
    //     [ 63.5, 0, 0.000020624525132396522 ],
    //     [ 64.5, 0, 0.000016867589533140664 ],
    //     [ 65.5, 0, 0.000013785609413643612 ],
    //     [ 66.5, 0.0037735849056603774, 0.000011259309780444045 ],
    //     [ 67.5, 0, 0.000009190073653789351 ],
    //     [ 68.5, 0, 0.000007496453216403037 ],
    //     [ 69.5, 0, 0.000006111251186318431 ]
    //   ],
    //   arrCounts: [
    //     [ 1.5, 0, 0.5391538687486649 ],
    //     [ 2.5, 0, 1.7962366549396136 ],
    //     [ 3.5, 0, 3.6496228281644183 ],
    //     [ 4.5, 3, 5.8241969598371295 ],
    //     [ 5.5, 6, 8.050850888970505 ],
    //     [ 6.5, 12, 10.116702459548634 ],
    //     [ 7.5, 8, 11.87765914367292 ],
    //     [ 8.5, 14, 13.253399694878366 ],
    //     [ 9.5, 11, 14.215288530920441 ],
    //     [ 10.5, 21, 14.772679099506087 ],
    //     [ 11.5, 19, 14.960261704970373 ],
    //     [ 12.5, 12, 14.827558250265724 ],
    //     [ 13.5, 13, 14.430829942813553 ],
    //     [ 14.5, 11, 13.827242726898026 ],
    //     [ 15.5, 8, 13.07095155953816 ],
    //     [ 16.5, 11, 12.210712745510621 ],
    //     [ 17.5, 12, 11.288650328503703 ],
    //     [ 18.5, 11, 10.339851012584218 ],
    //     [ 19.5, 9, 9.39252121880613 ],
    //     [ 20.5, 5, 8.468498318091852 ],
    //     [ 21.5, 4, 7.583960280136492 ],
    //     [ 22.5, 5, 6.750221777228556 ],
    //     [ 23.5, 5, 5.9745399025179875 ],
    //     [ 24.5, 2, 5.2608797942579475 ],
    //     [ 25.5, 4, 4.610610715596152 ],
    //     [ 26.5, 4, 4.023117751242098 ],
    //     [ 27.5, 1, 3.496324420399798 ],
    //     [ 28.5, 3, 3.027128206691178 ],
    //     [ 29.5, 0, 2.6117551424982124 ],
    //     [ 30.5, 3, 2.2460418640307847 ],
    //     [ 31.5, 4, 1.9256545303972914 ],
    //     [ 32.5, 3, 1.6462541008256864 ],
    //     [ 33.5, 0, 1.4036170069784626 ],
    //     [ 34.5, 1, 1.1937194734611656 ],
    //     [ 35.5, 3, 1.0127927927869 ],
    //     [ 36.5, 3, 0.8573558630200342 ],
    //     [ 37.5, 2, 0.7242303200818259 ],
    //     [ 38.5, 3, 0.6105426869017874 ],
    //     [ 39.5, 3, 0.5137171426696564 ],
    //     [ 40.5, 1, 0.4314617978258695 ],
    //     [ 41.5, 1, 0.3617507452461212 ],
    //     [ 42.5, 1, 0.3028036405593052 ],
    //     [ 43.5, 3, 0.25306413648863774 ],
    //     [ 44.5, 0, 0.2111781476150444 ],
    //     [ 45.5, 2, 0.17597264257921433 ],
    //     [ 46.5, 0, 0.146435440227838 ],
    //     [ 47.5, 3, 0.12169631500919359 ],
    //     [ 48.5, 0, 0.10100958639922931 ],
    //     [ 49.5, 3, 0.08373826969261944 ],
    //     [ 50.5, 1, 0.06933979457326575 ],
    //     [ 51.5, 2, 0.05735324793605729 ],
    //     [ 52.5, 0, 0.04738806383690151 ],
    //     [ 53.5, 2, 0.03911406239201894 ],
    //     [ 54.5, 1, 0.03225272783707576 ],
    //     [ 55.5, 0, 0.026569611311524 ],
    //     [ 56.5, 2, 0.021867744289820357 ],
    //     [ 57.5, 1, 0.017981952404664568 ],
    //     [ 58.5, 0, 0.014773965516155646 ],
    //     [ 59.5, 2, 0.012128227378694569 ],
    //     [ 60.5, 0, 0.009948316477537654 ],
    //     [ 61.5, 0, 0.008153898063560708 ],
    //     [ 62.5, 0, 0.006678135764514467 ],
    //     [ 63.5, 0, 0.005465499160085078 ],
    //     [ 64.5, 0, 0.004469911226282276 ],
    //     [ 65.5, 0, 0.0036531864946155574 ],
    //     [ 66.5, 1, 0.002983717091817672 ],
    //     [ 67.5, 0, 0.002435369518254178 ],
    //     [ 68.5, 0, 0.0019865601023468047 ],
    //     [ 69.5, 0, 0.0016194815643743841 ]
    //   ],
    //   dx: 1,
    //   bs: [
    //     { min: 1, max: 2, avg: 1.5, arr: [], counts: 0, pdf: 0 },
    //     { min: 2, max: 3, avg: 2.5, arr: [], counts: 0, pdf: 0 },
    //     { min: 3, max: 4, avg: 3.5, arr: [], counts: 0, pdf: 0 },
    //     {
    //       min: 4,
    //       max: 5,
    //       avg: 4.5,
    //       arr: [Array],
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     {
    //       min: 5,
    //       max: 6,
    //       avg: 5.5,
    //       arr: [Array],
    //       counts: 6,
    //       pdf: 0.022641509433962263
    //     },
    //     {
    //       min: 6,
    //       max: 7,
    //       avg: 6.5,
    //       arr: [Array],
    //       counts: 12,
    //       pdf: 0.045283018867924525
    //     },
    //     {
    //       min: 7,
    //       max: 8,
    //       avg: 7.5,
    //       arr: [Array],
    //       counts: 8,
    //       pdf: 0.03018867924528302
    //     },
    //     {
    //       min: 8,
    //       max: 9,
    //       avg: 8.5,
    //       arr: [Array],
    //       counts: 14,
    //       pdf: 0.052830188679245285
    //     },
    //     {
    //       min: 9,
    //       max: 10,
    //       avg: 9.5,
    //       arr: [Array],
    //       counts: 11,
    //       pdf: 0.04150943396226415
    //     },
    //     {
    //       min: 10,
    //       max: 11,
    //       avg: 10.5,
    //       arr: [Array],
    //       counts: 21,
    //       pdf: 0.07924528301886792
    //     },
    //     {
    //       min: 11,
    //       max: 12,
    //       avg: 11.5,
    //       arr: [Array],
    //       counts: 19,
    //       pdf: 0.07169811320754717
    //     },
    //     {
    //       min: 12,
    //       max: 13,
    //       avg: 12.5,
    //       arr: [Array],
    //       counts: 12,
    //       pdf: 0.045283018867924525
    //     },
    //     {
    //       min: 13,
    //       max: 14,
    //       avg: 13.5,
    //       arr: [Array],
    //       counts: 13,
    //       pdf: 0.04905660377358491
    //     },
    //     {
    //       min: 14,
    //       max: 15,
    //       avg: 14.5,
    //       arr: [Array],
    //       counts: 11,
    //       pdf: 0.04150943396226415
    //     },
    //     {
    //       min: 15,
    //       max: 16,
    //       avg: 15.5,
    //       arr: [Array],
    //       counts: 8,
    //       pdf: 0.03018867924528302
    //     },
    //     {
    //       min: 16,
    //       max: 17,
    //       avg: 16.5,
    //       arr: [Array],
    //       counts: 11,
    //       pdf: 0.04150943396226415
    //     },
    //     {
    //       min: 17,
    //       max: 18,
    //       avg: 17.5,
    //       arr: [Array],
    //       counts: 12,
    //       pdf: 0.045283018867924525
    //     },
    //     {
    //       min: 18,
    //       max: 19,
    //       avg: 18.5,
    //       arr: [Array],
    //       counts: 11,
    //       pdf: 0.04150943396226415
    //     },
    //     {
    //       min: 19,
    //       max: 20,
    //       avg: 19.5,
    //       arr: [Array],
    //       counts: 9,
    //       pdf: 0.033962264150943396
    //     },
    //     {
    //       min: 20,
    //       max: 21,
    //       avg: 20.5,
    //       arr: [Array],
    //       counts: 5,
    //       pdf: 0.018867924528301886
    //     },
    //     {
    //       min: 21,
    //       max: 22,
    //       avg: 21.5,
    //       arr: [Array],
    //       counts: 4,
    //       pdf: 0.01509433962264151
    //     },
    //     {
    //       min: 22,
    //       max: 23,
    //       avg: 22.5,
    //       arr: [Array],
    //       counts: 5,
    //       pdf: 0.018867924528301886
    //     },
    //     {
    //       min: 23,
    //       max: 24,
    //       avg: 23.5,
    //       arr: [Array],
    //       counts: 5,
    //       pdf: 0.018867924528301886
    //     },
    //     {
    //       min: 24,
    //       max: 25,
    //       avg: 24.5,
    //       arr: [Array],
    //       counts: 2,
    //       pdf: 0.007547169811320755
    //     },
    //     {
    //       min: 25,
    //       max: 26,
    //       avg: 25.5,
    //       arr: [Array],
    //       counts: 4,
    //       pdf: 0.01509433962264151
    //     },
    //     {
    //       min: 26,
    //       max: 27,
    //       avg: 26.5,
    //       arr: [Array],
    //       counts: 4,
    //       pdf: 0.01509433962264151
    //     },
    //     {
    //       min: 27,
    //       max: 28,
    //       avg: 27.5,
    //       arr: [Array],
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     {
    //       min: 28,
    //       max: 29,
    //       avg: 28.5,
    //       arr: [Array],
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     { min: 29, max: 30, avg: 29.5, arr: [], counts: 0, pdf: 0 },
    //     {
    //       min: 30,
    //       max: 31,
    //       avg: 30.5,
    //       arr: [Array],
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     {
    //       min: 31,
    //       max: 32,
    //       avg: 31.5,
    //       arr: [Array],
    //       counts: 4,
    //       pdf: 0.01509433962264151
    //     },
    //     {
    //       min: 32,
    //       max: 33,
    //       avg: 32.5,
    //       arr: [Array],
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     { min: 33, max: 34, avg: 33.5, arr: [], counts: 0, pdf: 0 },
    //     {
    //       min: 34,
    //       max: 35,
    //       avg: 34.5,
    //       arr: [Array],
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     {
    //       min: 35,
    //       max: 36,
    //       avg: 35.5,
    //       arr: [Array],
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     {
    //       min: 36,
    //       max: 37,
    //       avg: 36.5,
    //       arr: [Array],
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     {
    //       min: 37,
    //       max: 38,
    //       avg: 37.5,
    //       arr: [Array],
    //       counts: 2,
    //       pdf: 0.007547169811320755
    //     },
    //     {
    //       min: 38,
    //       max: 39,
    //       avg: 38.5,
    //       arr: [Array],
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     {
    //       min: 39,
    //       max: 40,
    //       avg: 39.5,
    //       arr: [Array],
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     {
    //       min: 40,
    //       max: 41,
    //       avg: 40.5,
    //       arr: [Array],
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     {
    //       min: 41,
    //       max: 42,
    //       avg: 41.5,
    //       arr: [Array],
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     {
    //       min: 42,
    //       max: 43,
    //       avg: 42.5,
    //       arr: [Array],
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     {
    //       min: 43,
    //       max: 44,
    //       avg: 43.5,
    //       arr: [Array],
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     { min: 44, max: 45, avg: 44.5, arr: [], counts: 0, pdf: 0 },
    //     {
    //       min: 45,
    //       max: 46,
    //       avg: 45.5,
    //       arr: [Array],
    //       counts: 2,
    //       pdf: 0.007547169811320755
    //     },
    //     { min: 46, max: 47, avg: 46.5, arr: [], counts: 0, pdf: 0 },
    //     {
    //       min: 47,
    //       max: 48,
    //       avg: 47.5,
    //       arr: [Array],
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     { min: 48, max: 49, avg: 48.5, arr: [], counts: 0, pdf: 0 },
    //     {
    //       min: 49,
    //       max: 50,
    //       avg: 49.5,
    //       arr: [Array],
    //       counts: 3,
    //       pdf: 0.011320754716981131
    //     },
    //     {
    //       min: 50,
    //       max: 51,
    //       avg: 50.5,
    //       arr: [Array],
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     {
    //       min: 51,
    //       max: 52,
    //       avg: 51.5,
    //       arr: [Array],
    //       counts: 2,
    //       pdf: 0.007547169811320755
    //     },
    //     { min: 52, max: 53, avg: 52.5, arr: [], counts: 0, pdf: 0 },
    //     {
    //       min: 53,
    //       max: 54,
    //       avg: 53.5,
    //       arr: [Array],
    //       counts: 2,
    //       pdf: 0.007547169811320755
    //     },
    //     {
    //       min: 54,
    //       max: 55,
    //       avg: 54.5,
    //       arr: [Array],
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     { min: 55, max: 56, avg: 55.5, arr: [], counts: 0, pdf: 0 },
    //     {
    //       min: 56,
    //       max: 57,
    //       avg: 56.5,
    //       arr: [Array],
    //       counts: 2,
    //       pdf: 0.007547169811320755
    //     },
    //     {
    //       min: 57,
    //       max: 58,
    //       avg: 57.5,
    //       arr: [Array],
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     { min: 58, max: 59, avg: 58.5, arr: [], counts: 0, pdf: 0 },
    //     {
    //       min: 59,
    //       max: 60,
    //       avg: 59.5,
    //       arr: [Array],
    //       counts: 2,
    //       pdf: 0.007547169811320755
    //     },
    //     { min: 60, max: 61, avg: 60.5, arr: [], counts: 0, pdf: 0 },
    //     { min: 61, max: 62, avg: 61.5, arr: [], counts: 0, pdf: 0 },
    //     { min: 62, max: 63, avg: 62.5, arr: [], counts: 0, pdf: 0 },
    //     { min: 63, max: 64, avg: 63.5, arr: [], counts: 0, pdf: 0 },
    //     { min: 64, max: 65, avg: 64.5, arr: [], counts: 0, pdf: 0 },
    //     { min: 65, max: 66, avg: 65.5, arr: [], counts: 0, pdf: 0 },
    //     {
    //       min: 66,
    //       max: 67,
    //       avg: 66.5,
    //       arr: [Array],
    //       counts: 1,
    //       pdf: 0.0037735849056603774
    //     },
    //     { min: 67, max: 68, avg: 67.5, arr: [], counts: 0, pdf: 0 },
    //     { min: 68, max: 69, avg: 68.5, arr: [], counts: 0, pdf: 0 },
    //     { min: 69, max: 70, avg: 69.5, arr: [], counts: 0, pdf: 0 }
    //   ]
    // }

}
test()
    .catch((err) => {
        console.log(err)
    })

//node --experimental-modules --es-module-specifier-resolution=node g.arrGammaFit.mjs
