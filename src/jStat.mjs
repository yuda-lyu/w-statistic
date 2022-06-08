import jstat from 'jstat'

//https://github.com/jstat/jstat/
//http://jstat.github.io/distributions.html


let jStat = jstat.jStat

let beta = {
    // jStat.beta( alpha, beta )
    // jStat.beta.pdf( x, alpha, beta )
    pdf: jStat.beta.pdf,
    // jStat.beta.cdf( x, alpha, beta )
    cdf: jStat.beta.cdf,
    // jStat.beta.inv( p, alpha, beta )
    inv: jStat.beta.inv,
    // jStat.beta.mean( alpha, beta )
    // jStat.beta.median( alpha, beta )
    // jStat.beta.mode( alpha, beta )
    // jStat.beta.sample( alpha, beta )
    sample: jStat.beta.sample,
    // jStat.beta.variance( alpha, beta )
}

let centralF = {
    // jStat.centralF(df1, df2)
    // jStat.centralF.pdf(x, df1, df2)
    pdf: jStat.centralF.pdf,
    // jStat.centralF.cdf(x, df1, df2)
    cdf: jStat.centralF.cdf,
    // jStat.centralF.inv(p, df1, df2)
    inv: jStat.centralF.inv,
    // jStat.centralF.mean(df1, df2)
    // jStat.centralF.mode(df1, df2)
    // jStat.centralF.sample(df1, df2)
    sample: jStat.centralF.sample,
    // jStat.centralF.variance(df1, df2)
}

let cauchy = {
    // jStat.cauchy(local, scale)
    // jStat.cauchy.pdf(x, local, scale)
    pdf: jStat.cauchy.pdf,
    // jStat.cauchy.cdf(x, local, scale)
    cdf: jStat.cauchy.cdf,
    // jStat.cauchy.inv(p, local, scale)
    inv: jStat.cauchy.inv,
    // jStat.cauchy.median(local, scale)
    // jStat.cauchy.mode(local, scale)
    // jStat.cauchy.sample(local, scale)
    sample: jStat.cauchy.sample,
    // jStat.cauchy.variance(local, scale)
}

let chisquare = {
    // jStat.chisquare(dof)
    // jStat.chisquare.pdf(x, dof)
    pdf: jStat.chisquare.pdf,
    // jStat.chisquare.cdf(x, dof)
    cdf: jStat.chisquare.cdf,
    // jStat.chisquare.inv(p, dof)
    inv: jStat.chisquare.inv,
    // jStat.chisquare.mean(dof)
    // jStat.chisquare.median(dof)
    // jStat.chisquare.mode(dof)
    // jStat.chisquare.sample(dof)
    sample: jStat.chisquare.sample,
    // jStat.chisquare.variance(dof)
}

let exponential = {
    // jStat.exponential(rate)
    // jStat.exponential.pdf(x, rate)
    pdf: jStat.exponential.pdf,
    // jStat.exponential.cdf(x, rate)
    cdf: jStat.exponential.cdf,
    // jStat.exponential.inv(p, rate)
    inv: jStat.exponential.inv,
    // jStat.exponential.mean(rate)
    // jStat.exponential.median(rate)
    // jStat.exponential.mode(rate)
    // jStat.exponential.sample(rate)
    sample: jStat.exponential.sample,
    // jStat.exponential.variance(rate)
}

let gamma = {
    // jStat.gamma(shape, scale)
    // jStat.gamma.pdf(x, shape, scale)
    pdf: jStat.gamma.pdf,
    // jStat.gamma.cdf(x, shape, scale)
    cdf: jStat.gamma.cdf,
    // jStat.gamma.inv(p, shape, scale)
    inv: jStat.gamma.inv,
    // jStat.gamma.mean(shape, scale)
    // jStat.gamma.mode(shape, scale)
    // jStat.gamma.sample(shape, scale)
    sample: jStat.gamma.sample,
    // jStat.gamma.variance(shape, scale)
}

let invgamma = {
    // jStat.invgamma(shape, scale)
    // jStat.invgamma.pdf(x, shape, scale)
    pdf: jStat.invgamma.pdf,
    // jStat.invgamma.cdf(x, shape, scale)
    cdf: jStat.invgamma.cdf,
    // jStat.invgamma.inv(p, shape, scale)
    inv: jStat.invgamma.inv,
    // jStat.invgamma.mean(shape, scale)
    // jStat.invgamma.mode(shape, scale)
    // jStat.invgamma.sample(shape, scale)
    sample: jStat.invgamma.sample,
    // jStat.invgamma.variance(shape, scale)
}

let kumaraswamy = {
    // jStat.kumaraswamy(alpha, beta)
    // jStat.kumaraswamy.pdf(x, a, b)
    pdf: jStat.kumaraswamy.pdf,
    // jStat.kumaraswamy.cdf(x, alpha, beta)
    cdf: jStat.kumaraswamy.cdf,
    // jStat.kumaraswamy.inv(p, alpha, beta)
    inv: jStat.kumaraswamy.inv,
    // jStat.kumaraswamy.mean(alpha, beta)
    // jStat.kumaraswamy.median(alpha, beta)
    // jStat.kumaraswamy.mode(alpha, beta)
    sample: jStat.kumaraswamy.sample,
    // jStat.kumaraswamy.variance(alpha, beta)
}

let lognormal = {
    // jStat.lognormal(mu, sigma)
    // jStat.lognormal.pdf(x, mu, sigma)
    pdf: jStat.lognormal.pdf,
    // jStat.lognormal.cdf(x, mu, sigma)
    cdf: jStat.lognormal.cdf,
    // jStat.lognormal.inv(p, mu, sigma)
    inv: jStat.lognormal.inv,
    // jStat.lognormal.mean(mu, sigma)
    // jStat.lognormal.median(mu, sigma)
    // jStat.lognormal.mode(mu, sigma)
    // jStat.lognormal.sample(mu, sigma)
    sample: jStat.lognormal.sample,
    // jStat.lognormal.variance(mu, sigma)
}

let normal = {
    // jStat.normal(mean, std)
    // jStat.normal.pdf(x, mean, std)
    pdf: jStat.normal.pdf,
    // jStat.normal.cdf(x, mean, std)
    cdf: jStat.normal.cdf,
    // jStat.normal.inv(p, mean, std)
    inv: jStat.normal.inv,
    // jStat.normal.mean(mean, std)
    // jStat.normal.median(mean, std)
    // jStat.normal.mode(mean, std)
    // jStat.normal.sample(mean, std)
    sample: jStat.normal.sample,
    // jStat.normal.variance(mean, std)
}

let pareto = {
    // jStat.pareto(scale, shape)
    // jStat.pareto.pdf(x, scale, shape)
    pdf: jStat.pareto.pdf,
    // jStat.pareto.cdf(x, scale, shape)
    cdf: jStat.pareto.cdf,
    // jStat.pareto.inv(p, scale, shape)
    inv: jStat.pareto.inv,
    // jStat.pareto.mean(scale, shape)
    // jStat.pareto.median(scale, shape)
    // jStat.pareto.mode(scale, shape)
    sample: (scale, shape) => {
        throw new Error(`invalid pareto.sample`)
    },
    // jStat.pareto.variance(scale, shape)
}

let studentt = {
    // jStat.studentt(dof)
    // jStat.studentt.pdf(x, dof)
    pdf: jStat.studentt.pdf,
    // jStat.studentt.cdf(x, dof)
    cdf: jStat.studentt.cdf,
    // jStat.studentt.inv(p, dof)
    inv: jStat.studentt.inv,
    // jStat.studentt.mean(dof)
    // jStat.studentt.median(dof)
    // jStat.studentt.mode(dof)
    // jStat.studentt.sample(dof)
    sample: jStat.studentt.sample,
    // jStat.studentt.variance(dof)
}

let tukey = {
    // jStat.tukey(nmeans, dof)
    pdf: (q, nmeans, dof) => {
        throw new Error(`invalid tukey.pdf`)
    },
    // jStat.tukey.cdf(q, nmeans, dof)
    cdf: jStat.tukey.cdf,
    // jStat.tukey.inv(p, nmeans, dof)
    inv: jStat.tukey.inv,
    sample: (nmeans, dof) => {
        throw new Error(`invalid tukey.sample`)
    },
}

let weibull = {
    // jStat.weibull(scale, shape)
    // jStat.weibull.pdf(x, scale, shape)
    pdf: jStat.weibull.pdf,
    // jStat.weibull.cdf(x, scale, shape)
    cdf: jStat.weibull.cdf,
    // jStat.weibull.inv(p, scale, shape)
    inv: jStat.weibull.inv,
    // jStat.weibull.mean(scale, shape)
    // jStat.weibull.median(scale, shape)
    // jStat.weibull.mode(scale, shape)
    // jStat.weibull.sample(scale, shape)
    sample: jStat.weibull.sample,
    // jStat.weibull.variance(scale, shape)
}

let uniform = {
    // jStat.uniform(a, b)
    // jStat.uniform.pdf(x, a, b)
    pdf: jStat.uniform.pdf,
    // jStat.uniform.cdf(x, a, b)
    cdf: jStat.uniform.cdf,
    // jStat.uniform.inv(p, a, b)
    inv: jStat.uniform.inv,
    // jStat.uniform.mean(a, b)
    // jStat.uniform.median(a, b)
    // jStat.uniform.mode(a, b)
    // jStat.uniform.sample(a, b)
    sample: jStat.uniform.sample,
    // jStat.uniform.variance(a, b)
}

let binomial = {
    // jStat.binomial
    // jStat.binomial.pdf(k, n, p)
    pdf: jStat.binomial.pdf,
    // jStat.binomial.cdf(k, n, p)
    cdf: jStat.binomial.cdf,
    inv: (k, n, p) => {
        throw new Error(`invalid binomial.inv`)
    },
    sample: (n, p) => {
        throw new Error(`invalid binomial.sample`)
    },
}

let negbin = {
    // jStat.negbin
    // jStat.negbin.pdf(k, r, p)
    pdf: jStat.negbin.pdf,
    // jStat.negbin.cdf(x, r, p)
    cdf: jStat.negbin.cdf,
    inv: (x, r, p) => {
        throw new Error(`invalid negbin.inv`)
    },
    sample: (r, p) => {
        throw new Error(`invalid negbin.sample`)
    },
}

let hypgeom = {
    // jStat.hypgeom
    // jStat.hypgeom.pdf(k, N, m, n)
    pdf: jStat.hypgeom.pdf,
    // jStat.hypgeom.cdf(x, N, m, n)
    cdf: jStat.hypgeom.cdf,
    inv: (x, N, m, n) => {
        throw new Error(`invalid hypgeom.inv`)
    },
    sample: (N, m, n) => {
        throw new Error(`invalid hypgeom.sample`)
    },
}

let poisson = {
    // jStat.poisson
    // jStat.poisson.pdf(k, l)
    pdf: jStat.poisson.pdf,
    // jStat.poisson.cdf(x, l)
    cdf: jStat.poisson.cdf,
    inv: (x, l) => {
        throw new Error(`invalid poisson.inv`)
    },
    // jStat.poisson.sample(l)
    sample: jStat.poisson.sample,
}

let triangular = {
    // jStat.triangular
    // jStat.triangular.pdf(x, a, b, c)
    pdf: jStat.triangular.pdf,
    // jStat.triangular.cdf(x, a, b, c)
    cdf: jStat.triangular.cdf,
    inv: (x, a, b, c) => {
        throw new Error(`invalid triangular.inv`)
    },
    // jStat.triangular.mean(a, b, c)
    // jStat.triangular.median(a, b, c)
    // jStat.triangular.mode(a, b, c)
    // jStat.triangular.sample(a, b, c)
    sample: jStat.triangular.sample,
    // jStat.triangular.variance(a, b, c)
}

let arcsine = {
    // jStat.arcsine(a, b)
    // jStat.arcsine.pdf(x, a, b)
    pdf: jStat.arcsine.pdf,
    // jStat.arcsine.cdf(x, a, b)
    cdf: jStat.arcsine.cdf,
    // jStat.arcsine.inv(p, a, b)
    inv: jStat.arcsine.inv,
    // jStat.arcsine.mean(a, b)
    // jStat.arcsine.median(a, b)
    // jStat.arcsine.mode(a, b)
    // jStat.arcsine.sample(a, b)
    sample: jStat.arcsine.sample,
    // jStat.arcsine.variance(a, b)
}

let std = (arr) => {
    return jStat.stdev(arr, false)
}

let sampleStd = (arr) => {
    return jStat.stdev(arr, true)
}

let emquantile = (arr, ratio) => {

    //計算數據的經驗分位數p(k), 與排序後取指定位置處數值(例如50%處位置數值)不一定相同
    //p(k) = (k - alphap)/(n + 1 - alphap - betap), 常用的(alphap,betap)如下:
    //(0,1)    : p(k) = k/n : linear interpolation of cdf (R type 4)
    //(.5,.5)  : p(k) = (k - 1/2.)/n : piecewise linear function (R type 5)
    //(0,0)    : p(k) = k/(n+1) : (R type 6)
    //(1,1)    : p(k) = (k-1)/(n-1): p(k) = mode[F(x[k])]. (R type 7, R default)
    //(1/3,1/3): p(k) = (k-1/3)/(n+1/3): Then p(k) ~ median[F(x[k])]. The resulting quantile estimates are approximately median-unbiased regardless of the distribution of x. (R type 8)
    //(3/8,3/8): p(k) = (k-3/8)/(n+1/4): Blom. The resulting quantile estimates are approximately unbiased if x is normally distributed (R type 9)
    //(.4,.4)  : approximately quantile unbiased (Cunnane)
    //(.35,.35): APL, used with PWM

    //alphap: 於scipy.stats.mstats.mquantiles是用0.4, 於simple-statistics是「接近」用0.5, 兩者結果不一定相同
    //betap: 於scipy.stats.mstats.mquantiles是用0.4, 於simple-statistics是「接近」用0.5, 兩者結果不一定相同

    //scipy.stats.mstats.mquantiles屬於Estimating quantiles from a sample, simple-statistics使用是Quantiles of a population, 故兩者結果不一定相同

    return jStat.quantiles(arr, [ratio], 0.4, 0.4)[0]
}

let emquantiles = jStat.quantiles

let percentile = jStat.percentile


let r = {

    //統計
    beta,
    centralF,
    cauchy,
    chisquare,
    exponential,
    gamma,
    invgamma,
    kumaraswamy,
    lognormal,
    normal,
    pareto,
    studentt,
    tukey,
    weibull,
    uniform,
    binomial,
    negbin,
    hypgeom,
    poisson,
    triangular,
    arcsine,

    //序列
    std,
    sampleStd,
    emquantile,
    emquantiles,
    percentile,

}


export default r
