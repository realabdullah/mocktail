import type { IHistory } from "~/types";

export const useStore = defineStore("store", () => {
  const mockHistoryItems = ref<IHistory[]>([
    {
      id: 1,
      title: "User Profile",
      data: JSON.stringify(
        {
          id: "64d4e2a0b8a7c3a9e4a6b5c1",
          name: "John Doe",
          email: "john@example.com",
          role: "Admin",
          createdAt: "2023-07-17T10:30:00.000Z",
        },
        null,
        2
      ),
      timestamp: new Date("2023-07-17T10:30:00.000Z").getTime(),
      color: "#4F46E5", // Indigo
      starred: true,
      tags: ["user", "profile", "auth"],
    },
    {
      id: 2,
      title: "Product List",
      data: JSON.stringify(
        [
          { id: 1, name: "Product A", price: 29.99, inStock: true },
          { id: 2, name: "Product B", price: 49.99, inStock: false },
          { id: 3, name: "Product C", price: 19.99, inStock: true },
        ],
        null,
        2
      ),
      timestamp: new Date("2023-07-15T14:45:00.000Z").getTime(),
      color: "#8B5CF6", // Purple
      starred: false,
      tags: ["product", "inventory", "array"],
    },
    {
      id: 3,
      title: "Task Interface",
      data: JSON.stringify(
        {
          id: "64d4e2a0b8a7c3a9e4a6b5c1",
          title: "Implement User Authentication",
          description: "Set up user authentication using JWT.",
          priority: "High",
          dueDate: "2023-08-15T00:00:00.000Z",
          status: "In Progress",
          workspace: "Project Phoenix",
          user: {
            username: "john.doe",
            name: "John Doe",
          },
        },
        null,
        2
      ),
      timestamp: new Date("2023-06-22T09:15:00.000Z").getTime(),
      color: "#EC4899", // Pink
      starred: false,
      tags: ["task", "interface", "project"],
    },
    {
      id: 4,
      title: "API Response",
      data: JSON.stringify(
        {
          status: "success",
          code: 200,
          data: {
            items: [
              { id: 1, name: "Item A" },
              { id: 2, name: "Item B" },
            ],
            pagination: {
              total: 50,
              page: 1,
              limit: 10,
            },
          },
        },
        null,
        2
      ),
      timestamp: new Date("2023-07-17T16:20:00.000Z").getTime(),
      color: "#10B981", // Emerald
      starred: true,
      tags: ["api", "response", "pagination"],
    },
    {
      id: 5,
      title: "Config Settings",
      data: JSON.stringify(
        {
          theme: "dark",
          notifications: true,
          language: "en-US",
          autoSave: true,
          performance: { animations: true, caching: true },
        },
        null,
        2
      ),
      timestamp: new Date("2023-05-10T11:30:00.000Z").getTime(),
      color: "#F59E0B", // Amber
      starred: false,
      tags: ["config", "settings"],
    },
  ]);

  const mockTrashItems = [
    {
      id: 6,
      title: "Old Config",
      data: JSON.stringify(
        {
          apiKey: "abc123",
          endpoint: "https://api.example.com",
          timeout: 5000,
        },
        null,
        2
      ),
      timestamp: new Date("2023-04-05T14:30:00.000Z").getTime(),
      color: "#F43F5E", // Rose
      tags: ["config", "api"],
    },
  ];

  const itemsByDate = computed(() => {
    const grouped: Record<string, typeof mockHistoryItems.value> = {};

    // Group by year and month
    mockHistoryItems.value.forEach((item) => {
      const date = new Date(item.timestamp);
      const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!grouped[yearMonth]) grouped[yearMonth] = [];
      grouped[yearMonth].push(item);
    });

    // Sort by date (newest first)
    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => b.timestamp - a.timestamp);
    });

    return grouped;
  });

  const allTags = computed(() => {
    const tags = new Set<string>();

    mockHistoryItems.value.forEach((item) => {
      item.tags.forEach((tag) => tags.add(tag));
    });

    return Array.from(tags).sort();
  });

  // Get all starred items
  const starredItems = computed(() => {
    return mockHistoryItems.value.filter((item) => item.starred);
  });

  const selectedItem = ref<IHistory>();
  const selectedTab = ref("date");
  const searchQuery = ref("");
  const selectedDate = ref("");
  const selectedTag = ref("");
  const showStarredItems = ref(false);

  // Filter items based on search query
  const filteredItems = computed(() => {
    if (!searchQuery.value) {
      if (selectedDate.value) {
        const [year, month] = selectedDate.value.split("-").map(Number);
        return mockHistoryItems.value.filter((item) => {
          const date = new Date(item.timestamp);
          return date.getFullYear() === year && date.getMonth() + 1 === month;
        });
      } else if (selectedTag.value) {
        return mockHistoryItems.value.filter((item) =>
          item.tags.includes(selectedTag.value)
        );
      } else if (selectedTab.value === "starred") {
        return starredItems.value;
      }
      return [];
    }

    return mockHistoryItems.value.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    );
  });

  const formattedSelectedDate = computed(() => {
    const [year, month] = selectedDate.value.split("-").map(Number);
    const monthName = new Date(year, month - 1).toLocaleString("default", {
      month: "long",
    });
    return `${monthName} ${year}`;
  });

  const tags = computed(() =>
    allTags.value.map((tag) => {
      return {
        tag,
        count: mockHistoryItems.value.filter((item) => item.tags.includes(tag))
          .length,
      };
    })
  );

  const dateViewItems = computed(() => {
    return Object.entries(itemsByDate.value)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([yearMonth, items]) => {
        const [year, month] = yearMonth.split("-").map(Number);
        const monthName = new Date(year, month - 1).toLocaleString("default", {
          month: "long",
        });

        return {
          label: `${monthName} ${year}`,
          value: yearMonth,
          count: items?.length ?? 0,
          item: items,
        };
      });
  });

  return {
    formattedSelectedDate,
    mockHistoryItems,
    mockTrashItems,
    itemsByDate,
    allTags,
    starredItems,
    selectedItem,
    searchQuery,
    selectedDate,
    selectedTag,
    showStarredItems,
    filteredItems,
    tags,
    dateViewItems,
  };
});
