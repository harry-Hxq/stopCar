import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

/**
 * 登录
 */
export const accountLogin = (param) => fetch('/tp/login', {
	...param
}, 'POST');


/**
 * 开户
 */
export const openAccount = (param) => fetch('/tp/open_account', {
	auth: 1,
	...param
}, 'POST');


/**
 * 上传身份证
 */
export const uploadIdCard = (param) => fetch('/tp/get_id_card_info', {
	auth: 1,
	...param
}, 'POST');


/**
 * erp注册
 */
export const erpRegister = (param) => fetch('/tp/sales_register', {
	...param
}, 'POST');


/**
 * 代理列表
 */
export const getErpList = (param) => fetch('/tp/get_erp_list', {
    auth: 1,
	...param
}, 'POST');
/**
 * 代理列表
 */
export const getFundList = (param) => fetch('/tp/get_fund_list', {
    auth: 1,
	...param
}, 'POST');

/**
 * 基金客户注册
 */
export const fundRegister = (param) => fetch('/tp/register', {
    auth: 1,
	...param
}, 'POST');

/**
 * 设置、修改交易密码
 */
export const setTrdPassword = (param) => fetch('/tp/modify_trade_password', {
    auth: 1,
	...param
}, 'POST');


/**
 * 获取基金客户信息
 */
export const getCustomers = (param) => fetch('/tp/customers', {
    auth: 1,
	...param
}, 'POST');

/**
 * 获取erp客户信息
 */
export const getAgents = (param) => fetch('/tp/get_erps', {
    auth: 1,
	...param
}, 'POST');

/**
 * 保存开户状态为三
 */
export const saveOpenStateThree = (param) => fetch('/tp/save_open_state_three', {
    auth: 1,
	...param
}, 'POST');

/**
 * 保存开户状态为4
 */
export const saveOpenStateFour = (param) => fetch('/tp/save_open_state_four', {
    auth: 1,
	...param
}, 'POST');


/**
 * 保存开户状态为5
 */
export const saveOpenStateFinal = (param) => fetch('/tp/save_open_state_final', {
    auth: 1,
	...param
}, 'POST');

/**
 * 上传入金凭证
 */
export const uploadDeposit = (param) => fetch('/tp/upload_deposit', {
    auth: 1,
	...param
}, 'POST');


/**
 * 币种账户信息
 */
export const cashAccount = (param) => fetch('/tp/cash_accounts', {
    auth: 1,
	...param
}, 'POST');

/**
 * 币种账户信息
 */
export const banks = (param) => fetch('/tp/banks', {
    auth: 1,
	...param
}, 'POST');


/**
 * 提现
 */
export const withdraw = (param) => fetch('/tp/withdraw', {
    auth: 1,
	...param
}, 'POST');



/**
 * 提现
 */
export const exchange = (param) => fetch('/tp/exchange', {
    auth: 1,
	...param
}, 'POST');


/**
 * 编辑银行卡
 */
export const editBank = (param) => fetch('/tp/bank_card_edit', {
    auth: 1,
	...param
}, 'POST');

/**
 * 编辑银行卡
 */
export const Bank = (param) => fetch('/tp/banks', {
    auth: 1,
	...param
}, 'POST');


/**
 * 基金交易记录
 */
export const tradeRecode = (param) => fetch('/tp/trade_recode', {
    auth: 1,
	...param
}, 'POST');

/**
 * 入金记录
 */
export const depositRecode = (param) => fetch('/tp/deposit_recode', {
    auth: 1,
	...param
}, 'POST');

/**
 * 提现记录
 */
export const withdrawRecode = (param) => fetch('/tp/exchanges', {
    auth: 1,
	...param
}, 'POST');


/**
 * 获取基金账户信息
 */
export const fundAccounts = (param) => fetch('/tp/fund_accounts', {
    auth: 1,
	...param
}, 'POST');


/**
 * 获取基金账户信息
 */
export const totalAccounts = (param) => fetch('/tp/total_accounts', {
    auth: 1,
    ...param
}, 'POST');

/**
 * 认购
 */
export const purchase = (param) => fetch('/tp/purchase', {
    auth: 1,
    ...param
}, 'POST');


/**
 * 赎回
 */
export const redeem = (param) => fetch('/tp/redeem', {
    auth: 1,
    ...param
}, 'POST');


/**
 * 基金搜索
 */
export const fundSearch = (param) => fetch('/tp/fund_search', {
    auth: 1,
    ...param
}, 'POST');

/**
 * 基金基本信息
 */
export const fundBaseInfo = (param) => fetch('/tp/fund_base_info', {
    auth: 1,
    ...param
}, 'POST');


/**
 * 设置B端交易密码
 */
export const setAgentTradePassword = (param) => fetch('/tp/set_agent_trade_password', {
    auth: 1,
    ...param
}, 'POST');


/**
 * 修改B端交易密码
 */
export const modifyAgentTradePassword = (param) => fetch('/tp/modify_agent_trade_password', {
    auth: 1,
    ...param
}, 'POST');


/**
 * 发送手机验证码
 */
export const sendPhoneVerify = (param) => fetch('/tp/send_phone_verify', {
    auth: 1,
    ...param
}, 'POST');

/**
 * 获取erp管理员信息
 */
export const getUc = (param) => fetch('/tp/get_uc', {
    auth: 1,
    ...param
}, 'POST');

/**
 * 获取业绩统计数据
 */
export const GetPerformanceData = (param) => fetch('/tp/get_performance_data', {
    auth: 1,
    ...param
}, 'POST');


/**
 * 设定费率(指定时间)
 */
export const setRate = (param) => fetch('/tp/set_rate', {
    auth: 1,
    ...param
}, 'POST');

/**
 * 设定费率(首次设定费率)
 */
export const setRateFirst = (param) => fetch('/tp/set_rate_first', {
    auth: 1,
    ...param
}, 'POST');

/**
 * 更改费率申请
 */
export const updateRateReply = (param) => fetch('/tp/update_rate_reply', {
    auth: 1,
    ...param
}, 'POST');


/**
 * 费率申请列表
 */
export const rateReplyRecord = (param) => fetch('/tp/rate_reply_record', {
    auth: 1,
    ...param
}, 'POST');

