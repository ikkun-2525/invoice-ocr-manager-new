import { useState } from 'react';

export interface ProjectBreakdown {
  id: string;
  breakdownNo: string;
  department: string;
  salesPerson: string;
  projectNumber: string;
  amount: number;
  accountTitle: string;
  subAccount: string;
  costCategory: string;
  taxCategory: string;
  acceptanceMonth: string;
}

export const useProjectBreakdown = () => {
  const [breakdowns, setBreakdowns] = useState<ProjectBreakdown[]>([
    {
      id: "1",
      breakdownNo: "001",
      department: "営業部",
      salesPerson: "山田太郎",
      projectNumber: "PRJ-001",
      amount: 100000,
      accountTitle: "outsourcing",
      subAccount: "コンサルティング",
      costCategory: "sga_var_ads",
      taxCategory: "taxable_10",
      acceptanceMonth: "2023-06"
    },
    {
      id: "2",
      breakdownNo: "002",
      department: "開発部",
      salesPerson: "鈴木一郎",
      projectNumber: "PRJ-002",
      amount: 200000,
      accountTitle: "commission",
      subAccount: "システム開発",
      costCategory: "dept_sga_salary",
      taxCategory: "taxable_10",
      acceptanceMonth: "2023-06"
    },
    {
      id: "3",
      breakdownNo: "003",
      department: "サポート部",
      salesPerson: "佐藤花子",
      projectNumber: "PRJ-003",
      amount: 50000,
      accountTitle: "utilities",
      subAccount: "保守サポート",
      costCategory: "common_sga_saas",
      taxCategory: "taxable_10",
      acceptanceMonth: "2023-06"
    }
  ]);

  const handleBreakdownChange = (index: number, field: keyof ProjectBreakdown, value: string | number) => {
    setBreakdowns(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const addBreakdown = () => {
    setBreakdowns(prev => [...prev, {
      id: Math.random().toString(36).slice(2, 11),
      breakdownNo: "",
      department: "",
      salesPerson: "",
      projectNumber: "",
      amount: 0,
      accountTitle: "",
      subAccount: "",
      costCategory: "",
      taxCategory: "",
      acceptanceMonth: ""
    }]);
  };

  return {
    breakdowns,
    handleBreakdownChange,
    addBreakdown
  };
};