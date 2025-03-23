import type { IHistory } from "~/types";

export const useStore = defineStore("store", () => {
  const histories = ref<IHistory[]>([]);
  const trash = ref<IHistory[]>([]);

  const selectedHistory = ref<IHistory>();
  const selectedTab = ref("date");
  const searchQuery = ref("");
  const selectedDate = ref("");
  const selectedTag = ref("");
  const showStarredItems = ref(false);

  const starredItems = computed(() => {
    return histories.value.filter((item) => item.starred);
  });
  
  const filteredItems = computed(() => {
    const query = searchQuery.value?.toLowerCase();

    if (query) {
      return histories.value.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedDate.value) {
      return histories.value.filter(
        (item) => formatTimestamp(item.timestamp) === selectedDate.value
      );
    }

    if (selectedTag.value) {
      return histories.value.filter((item) =>
        item.tags.includes(selectedTag.value)
      );
    }

    if (selectedTab.value === "starred") return starredItems.value;

    return [];
  });

  const tags = computed(() => {
    const tagCounts = histories.value.reduce((acc, item) => {
      item.tags.forEach((tag) => acc.set(tag, (acc.get(tag) || 0) + 1));
      return acc;
    }, new Map<string, number>());

    return Array.from(tagCounts, ([tag, count]) => ({ tag, count })).sort(
      (a, b) => a.tag.localeCompare(b.tag)
    );
  });

  const dateViewItems = computed(() => {
    return Object.entries(
      histories.value.reduce((acc, item) => {
        const date = formatTimestamp(item.timestamp);
        (acc[date] ||= []).push(item);
        return acc;
      }, {} as Record<string, typeof histories.value>)
    )
      .map(([date, items]) => ({
        label: date,
        value: date,
        count: items.length,
        item: items.sort((a, b) => b.timestamp - a.timestamp),
      }))
      .sort((a, b) => b.label.localeCompare(a.label));
  });

  return {
    histories,
    trash,
    starredItems,
    selectedHistory,
    searchQuery,
    selectedDate,
    selectedTag,
    showStarredItems,
    filteredItems,
    tags,
    dateViewItems,
  };
});
