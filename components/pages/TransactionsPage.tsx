import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext.tsx';
import { CATEGORIES } from '../../constants.ts';
import { formatCurrency, formatDate } from '../../utils/formatter.ts';
import Icon from '../common/Icon.tsx';
import Card from '../common/Card.tsx';
import toast from 'react-hot-toast';

// @ts-ignore
import { utils, writeFile } from 'xlsx';
// @ts-ignore
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const TransactionsPage: React.FC = () => {
  const { transactions } = useAppContext();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>({ key: 'date', direction: 'desc' });

  const sortedTransactions = useMemo(() => {
    let sortableItems = [...transactions];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        // @ts-ignore
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        // @ts-ignore
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [transactions, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const handleExportCSV = () => {
    const dataToExport = sortedTransactions.map(tx => ({
        Date: formatDate(tx.date),
        Description: tx.description,
        Amount: tx.amount,
        Type: tx.type,
        Category: CATEGORIES.find(c => c.id === tx.category)?.name || 'N/A',
    }));
    const ws = utils.json_to_sheet(dataToExport);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Transactions");
    writeFile(wb, "FinTrack_Transactions.xlsx");
    toast.success('Exported to CSV!');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Date", "Description", "Amount", "Type", "Category"];
    const tableRows: any[] = [];

    sortedTransactions.forEach(tx => {
        const txData = [
            formatDate(tx.date),
            tx.description,
            formatCurrency(tx.amount),
            tx.type,
            CATEGORIES.find(c => c.id === tx.category)?.name || 'N/A',
        ];
        tableRows.push(txData);
    });

    // @ts-ignore
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("FinTrack Transactions", 14, 15);
    doc.save("FinTrack_Transactions.pdf");
    toast.success('Exported to PDF!');
  };


  return (
    <Card className="!p-0">
        <div className="p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">All Transactions</h2>
            <div className="flex items-center gap-2">
                <button onClick={handleExportCSV} className="px-3 py-2 text-sm font-semibold text-white bg-accent-green rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <Icon name="Sheet" size={16} />
                    <span>CSV</span>
                </button>
                <button onClick={handleExportPDF} className="px-3 py-2 text-sm font-semibold text-white bg-accent-red rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <Icon name="FileText" size={16} />
                    <span>PDF</span>
                </button>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-charcoal/50">
              <tr>
                <th className="p-4 font-semibold cursor-pointer" onClick={() => requestSort('date')}>Date</th>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold cursor-pointer" onClick={() => requestSort('amount')}>Amount</th>
                <th className="p-4 font-semibold">Category</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map(tx => {
                const category = CATEGORIES.find(c => c.id === tx.category);
                return (
                  <motion.tr 
                    key={tx.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-b dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-charcoal/30"
                  >
                    <td className="p-4 whitespace-nowrap">{formatDate(tx.date)}</td>
                    <td className="p-4 font-medium">{tx.description}</td>
                    <td className={`p-4 font-semibold ${tx.type === 'income' ? 'text-accent-green' : 'text-accent-red'}`}>
                      {tx.type === 'income' ? '+' : '-'} {formatCurrency(tx.amount)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Icon name={category?.icon || 'MoreHorizontal'} className={category?.color} size={18} />
                        <span>{category?.name}</span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
    </Card>
  );
};

export default TransactionsPage;