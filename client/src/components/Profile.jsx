export default function Profile() {
  const user = {
    name: "example",
    email: "example@example.com",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4g_2Qj3LsNR-iqUAFm6ut2EQVcaou4u2YXw&s",
    todos: {
      total: 1,
      completed: 1,
    },
  };

  // Calculate the completion percentage of todos
  const completionPercentage = (user.todos.completed / user.todos.total) * 100;

  return (
    <div className="bg-gray-900 min-h-[650px] flex justify-center items-center">
      <div className="bg-gray-800 text-gray-200 w-full max-w-md lg:max-w-4xl mx-auto p-6 lg:p-12 rounded-lg">
        {/* Card Header with Avatar */}
        <div className="p-4 border-b border-gray-700 flex flex-col lg:flex-row items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="object-cover w-full h-full"
              />
          </div>
          <div className="text-center lg:text-left">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-6">
          {/* Todo Progress */}
          <div>
            <h3 className="text-sm font-medium">Todo Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Todo Summary */}
          <div className="flex justify-between text-sm text-center lg:text-left">
            <div>
              <p className="font-medium">{user.todos.total}</p>
              <p className="text-gray-400">Total Todos</p>
            </div>
            <div>
              <p className="font-medium">{user.todos.completed}</p>
              <p className="text-gray-400">Completed</p>
            </div>
            <div>
              <p className="font-medium">
                {user.todos.total - user.todos.completed}
              </p>
              <p className="text-gray-400">Remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
