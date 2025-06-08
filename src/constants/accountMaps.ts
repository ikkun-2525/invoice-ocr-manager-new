// 勘定科目の変換マップ
export const ACCOUNT_TITLE_MAP: {[key: string]: string} = {
  "outsourcing": "外注費",
  "commission": "支払手数料",
  "advertising": "広告宣伝費",
  "travel": "旅費交通費",
  "communication": "通信費",
  "utilities": "水道光熱費",
  "supplies": "消耗品費",
  "rent": "地代家賃",
  "taxes": "租税公課",
  "insurance": "保険料",
  "meeting": "会議費",
  "entertainment": "接待交際費",
  "repair": "修繕費",
  "miscellaneous": "雑費",
  "newspaper_books": "新聞図書費",
  "personnel_outsourcing": "人件費（業務委託）",
  "purchase": "仕入高（原材料・商品）",
  "shipping": "運賃（配送費）",
  "lease": "リース料",
  "equipment": "備品購入費（資産計上対象外）",
  "honorarium": "支払報酬",
  "interest": "支払利息",
  "depreciation": "減価償却費",
  "social_insurance": "法定福利費"
};

// 原価区分の変換マップ
export const COST_CATEGORY_MAP: {[key: string]: string} = {
  "cogs_china": "売上原価：製造原価（中国仕入）",
  "cogs_materials": "売上原価：材料仕入原価",
  "cogs_design": "売上原価：デザイン外注費",
  "cogs_construction": "売上原価：施工外注費",
  "sga_var_ads": "販管費(変動)：広告費",
  "sga_var_travel_transport": "販管費(変動)：旅費交通費（移動）",
  "sga_var_travel_lodging": "販管費(変動)：旅費交通費（宿泊）",
  "sga_var_sales_outsourcing": "販管費(変動)：営業代行における業務委託費",
  "sga_var_shipping": "販管費(変動)：送料",
  "sga_var_rd": "販管費(変動)：研究開発費",
  "dept_sga_salary": "部門販管費：直接部門給与",
  "dept_sga_insurance": "部門販管費：直接部門社会保険料",
  "common_sga_salary": "共通販管費：バックオフィス給与",
  "common_sga_insurance": "共通販管費：バックオフィス社会保険料",
  "common_sga_outsourcing": "共通販管費：顧問など業務委託費",
  "common_sga_rent": "共通販管費：家賃",
  "common_sga_utilities": "共通販管費：水道光熱費",
  "common_sga_communication": "共通販管費：通信回線費",
  "common_sga_saas": "共通販管費：SaaS/WEBシステム利用料（リース含む）",
  "common_sga_insurance_other": "共通販管費：保険料",
  "common_sga_other": "共通販管費：その他（健康診断/加盟料/ネットバンク利用料）",
  "finance_interest": "財務支出：支払利息"
};

// 勘定科目の選択肢
export const ACCOUNT_TITLE_OPTIONS = [
  { value: "", label: "選択してください" },
  { value: "outsourcing", label: "外注費" },
  { value: "commission", label: "支払手数料" },
  { value: "advertising", label: "広告宣伝費" },
  { value: "travel", label: "旅費交通費" },
  { value: "communication", label: "通信費" },
  { value: "utilities", label: "水道光熱費" },
  { value: "supplies", label: "消耗品費" },
  { value: "rent", label: "地代家賃" },
  { value: "taxes", label: "租税公課" },
  { value: "insurance", label: "保険料" },
  { value: "meeting", label: "会議費" },
  { value: "entertainment", label: "接待交際費" },
  { value: "repair", label: "修繕費" },
  { value: "miscellaneous", label: "雑費" },
  { value: "newspaper_books", label: "新聞図書費" },
  { value: "personnel_outsourcing", label: "人件費（業務委託）" },
  { value: "purchase", label: "仕入高（原材料・商品）" },
  { value: "shipping", label: "運賃（配送費）" },
  { value: "lease", label: "リース料" },
  { value: "equipment", label: "備品購入費（資産計上対象外）" },
  { value: "honorarium", label: "支払報酬" },
  { value: "interest", label: "支払利息" },
  { value: "depreciation", label: "減価償却費" },
  { value: "social_insurance", label: "法定福利費" }
];

// 原価区分の選択肢
export const COST_CATEGORY_OPTIONS = [
  { value: "", label: "選択してください" },
  { value: "cogs_china", label: "売上原価：製造原価（中国仕入）" },
  { value: "cogs_materials", label: "売上原価：材料仕入原価" },
  { value: "cogs_design", label: "売上原価：デザイン外注費" },
  { value: "cogs_construction", label: "売上原価：施工外注費" },
  { value: "sga_var_ads", label: "販管費(変動)：広告費" },
  { value: "sga_var_travel_transport", label: "販管費(変動)：旅費交通費（移動）" },
  { value: "sga_var_travel_lodging", label: "販管費(変動)：旅費交通費（宿泊）" },
  { value: "sga_var_sales_outsourcing", label: "販管費(変動)：営業代行における業務委託費" },
  { value: "sga_var_shipping", label: "販管費(変動)：送料" },
  { value: "sga_var_rd", label: "販管費(変動)：研究開発費" },
  { value: "dept_sga_salary", label: "部門販管費：直接部門給与" },
  { value: "dept_sga_insurance", label: "部門販管費：直接部門社会保険料" },
  { value: "common_sga_salary", label: "共通販管費：バックオフィス給与" },
  { value: "common_sga_insurance", label: "共通販管費：バックオフィス社会保険料" },
  { value: "common_sga_outsourcing", label: "共通販管費：顧問など業務委託費" },
  { value: "common_sga_rent", label: "共通販管費：家賃" },
  { value: "common_sga_utilities", label: "共通販管費：水道光熱費" },
  { value: "common_sga_communication", label: "共通販管費：通信回線費" },
  { value: "common_sga_saas", label: "共通販管費：SaaS/WEBシステム利用料（リース含む）" },
  { value: "common_sga_insurance_other", label: "共通販管費：保険料" },
  { value: "common_sga_other", label: "共通販管費：その他（健康診断/加盟料/ネットバンク利用料）" },
  { value: "finance_interest", label: "財務支出：支払利息" }
];

// 税区分の選択肢
export const TAX_CATEGORY_OPTIONS = [
  { value: "", label: "選択してください" },
  { value: "taxable_10", label: "課税仕入（10%）" },
  { value: "taxable_8", label: "課税仕入（軽減8%）" },
  { value: "non_taxable", label: "非課税仕入" },
  { value: "tax_exempt", label: "免税仕入" }
];

// 支払方法の選択肢
export const PAYMENT_METHOD_OPTIONS = [
  { value: "", label: "選択してください" },
  { value: "bank_transfer", label: "銀行振込" },
  { value: "cash", label: "現金" },
  { value: "credit_card", label: "クレジットカード" },
  { value: "check", label: "小切手" },
  { value: "other", label: "その他" }
];

// 電子帳簿保存法対応状況の選択肢
export const ELECTRONIC_BOOKKEEPING_OPTIONS = [
  { value: "", label: "選択してください" },
  { value: "compliant", label: "対応済み" },
  { value: "non_compliant", label: "対応なし" },
  { value: "pending", label: "対応予定" }
];

// 口座種別の選択肢
export const ACCOUNT_TYPE_OPTIONS = [
  { value: "", label: "選択してください" },
  { value: "ordinary", label: "普通" },
  { value: "current", label: "当座" },
  { value: "savings", label: "貯蓄" }
];