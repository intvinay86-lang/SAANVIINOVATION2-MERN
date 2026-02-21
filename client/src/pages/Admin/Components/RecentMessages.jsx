function RecentMessages() {
  const messages = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      message: "Interested in web development services",
      date: "2024-02-18",
      status: "new",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      message: "Need a quote for mobile app",
      date: "2024-02-17",
      status: "read",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      message: "Question about pricing plans",
      date: "2024-02-16",
      status: "replied",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      message: "Looking for SEO services",
      date: "2024-02-15",
      status: "new",
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      new: "bg-green-100 text-green-700",
      read: "bg-blue-100 text-blue-700",
      replied: "bg-gray-100 text-gray-700",
    };
    return badges[status] || badges.new;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-800">Recent Messages</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {messages.map((msg) => (
              <tr
                key={msg.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-800">
                    {msg.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{msg.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 max-w-xs truncate">
                    {msg.message}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{msg.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(msg.status)}`}
                  >
                    {msg.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentMessages;
