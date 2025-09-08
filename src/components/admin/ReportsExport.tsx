import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function ReportsExport() {
  const handleExport = (format: 'pdf' | 'csv' | 'excel') => {
    // Handle export logic here
    console.log(`Exporting report as ${format}`);
  };

  const reportTypes = [
    {
      title: 'Payment Summary',
      description: 'Overview of all payments and their status',
      formats: ['pdf', 'csv', 'excel']
    },
    {
      title: 'Member Activity',
      description: 'Detailed member participation and payment history',
      formats: ['pdf', 'excel']
    },
    {
      title: 'Financial Statement',
      description: 'Complete financial overview of the group',
      formats: ['pdf']
    },
    {
      title: 'Payout Schedule',
      description: 'Timeline of past and future payouts',
      formats: ['pdf', 'csv']
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reportTypes.map((report, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="mb-4">
                <h3 className="font-medium text-gray-900">{report.title}</h3>
                <p className="text-sm text-gray-500">{report.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {report.formats.map((format) => (
                  <Button
                    key={format}
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport(format as 'pdf' | 'csv' | 'excel')}
                  >
                    Export as {format.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Quick Export</h4>
          <p className="text-sm text-blue-700 mb-4">
            Export all group data for the current month
          </p>
          <div className="flex space-x-2">
            <Button size="sm" onClick={() => handleExport('pdf')}>
              PDF Report
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
              Excel Spreadsheet
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
