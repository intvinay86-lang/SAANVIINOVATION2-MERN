import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEye } from "react-icons/fi";
import { getAllContacts } from "../../../features/contact/contactSlice";
import {
  selectContacts,
  selectContactLoading,
} from "../../../features/contact/contactSelectors";

function RecentMessages() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectContactLoading);

  useEffect(() => {
    dispatch(getAllContacts({ page: 1, limit: 5 }));
  }, [dispatch]);

  const getStatusBadge = (status) => {
    const badges = {
      new: "bg-green-100 text-green-700",
      read: "bg-blue-100 text-blue-700",
      replied: "bg-gray-100 text-gray-700",
      archived: "bg-purple-100 text-purple-700",
    };
    return badges[status] || badges.new;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Recent Messages</h3>
        <a
          href="#contact-messages"
          className="text-sm text-orange-600 hover:text-orange-700 font-medium"
        >
          View All
        </a>
      </div>
      {loading ? (
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="p-8 text-center text-gray-500">No messages yet</div>
      ) : (
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
                  Subject
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
              {contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className={`hover:bg-gray-50 transition-colors duration-200 ${
                    !contact.isRead ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-800">
                      {contact.firstName} {contact.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{contact.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs truncate">
                      {contact.subject}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {formatDate(contact.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${getStatusBadge(contact.status)}`}
                    >
                      {contact.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RecentMessages;
