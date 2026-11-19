// Pembantu debugging: log hanya keluar dalam mod pembangunan (bukan release build).
export const log = (...args) => {
  if (__DEV__) console.log('[DapurMama]', ...args);
};
