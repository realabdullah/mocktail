import type { IHistory } from "~/types";
import db from "~/utils/dexie";
import { v4 as uuidv4 } from "uuid";

export const useHistory = () => {
  const { histories, trash, selectedHistory } = storeToRefs(useStore());

  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchHistories = async () => {
    loading.value = true;
    error.value = null;
    try {
      histories.value = await db.history.toArray();
    } catch (err: any) {
      error.value = err.message || "Failed to fetch histories.";
    } finally {
      loading.value = false;
    }
  };

  const fetchTrash = async () => {
    loading.value = true;
    error.value = null;
    try {
      trash.value = await db.trash.toArray();
    } catch (err: any) {
      error.value = err.message || "Failed to fetch trash.";
    } finally {
      loading.value = false;
    }
  };

  const addHistory = async (newHistory: IHistory) => {
    try {
      newHistory.id = newHistory.id || uuidv4();
      await db.history.add(newHistory);
      await fetchHistories();
    } catch (err: any) {
      throw new Error(err.message || "Failed to add history.");
    }
  };

  const updateHistory = async (
    id: string,
    updatedFields: Partial<IHistory>
  ) => {
    try {
      const count = await db.history.update(id, updatedFields);
      if (count === 0) {
        throw new Error("No record found to update.");
      }
      await fetchHistories();
      selectedHistory.value = await db.history.get(id);
    } catch (err: any) {
      throw new Error(err.message || "Failed to update history.");
    }
  };

  const moveHistoryToTrash = async (id: string) => {
    try {
      await db.transaction("rw", db.history, db.trash, async () => {
        const item = await db.history.get(id);
        if (!item) {
          throw new Error("History item not found.");
        }
        await db.trash.add({ ...item, deletedAt: Date.now() });
        await db.history.delete(id);
      });
      selectedHistory.value = undefined;
      await fetchHistories();
      await fetchTrash();
      showToast("History moved to trash successfully.");
    } catch (err: any) {
      showToast("Failed to move history to trash.", "error");
    }
  };

  const restoreFromTrash = async (id: string) => {
    try {
      await db.transaction("rw", db.trash, db.history, async () => {
        const item = await db.trash.get(id);
        if (!item) {
          throw new Error("Trash item not found.");
        }
        await db.history.add({ ...item, deletedAt: undefined });
        await db.trash.delete(id);
      });
      await fetchHistories();
      await fetchTrash();
      showToast("History restored successfully.");
    } catch (err: any) {
      showToast("Failed to restore history.", "error");
    }
  };

  const batchRestoreFromTrash = async (ids: string[]) => {
    try {
      await db.transaction("rw", db.trash, db.history, async () => {
        const items = await db.trash.bulkGet(ids);
        if (!items.length) {
          throw new Error("Trash items not found.");
        }
        await db.history.bulkAdd(
          items
            .filter((item): item is IHistory => !!item)
            .map((item) => ({ ...item, deletedAt: undefined }))
        );
        await db.trash.bulkDelete(ids);
      });
      await fetchHistories();
      await fetchTrash();
      showToast(
        `${ids.length} histor${ids.length > 1 ? "ies" : "y"} restored.`
      );
    } catch (err: any) {
      showToast(
        `Failed to restore ${ids.length} histor${
          ids.length > 1 ? "ies" : "y"
        }.`,
        "error"
      );
    }
  };

  const permanentlyDeleteHistory = async (id: string) => {
    try {
      await db.trash.delete(id);
      await fetchTrash();
      showToast("Trash item permanently deleted.");
    } catch (err: any) {
      showToast("Failed to permanently delete trash item.", "error");
    }
  };

  const batchPermanentlyDeleteHistory = async (ids: string[]) => {
    try {
      await db.trash.bulkDelete(ids);
      await fetchTrash();
      showToast(`${ids.length} trash items permanently deleted.`);
    } catch (err: any) {
      showToast("Failed to permanently delete trash items.", "error");
    }
  };

  const getHistoryById = async (id: string) => {
    try {
      return await db.history.get(id);
    } catch (err: any) {
      throw new Error(err.message || "Failed to get history.");
    }
  };

  const toggleStar = async (id: string) => {
    try {
      const historyItem = await getHistoryById(id);
      if (!historyItem) {
        throw new Error("History item not found.");
      }
      await updateHistory(id, { starred: !historyItem.starred });
      showToast("Star toggled successfully.");
    } catch (err: any) {
      showToast("Failed to toggle star.", "error");
    }
  };

  const updateTitle = async (id: string, newTitle: string) => {
    try {
      await updateHistory(id, { title: newTitle });
      showToast("Title updated successfully.");
    } catch (err: any) {
      showToast("Failed to update title.", "error");
    }
  };

  const clearTrash = async () => {
    try {
      await db.trash.clear();
      await fetchTrash();
      showToast("Trash cleared successfully.");
    } catch (err: any) {
      showToast("Failed to clear trash.", "error");
    }
  };

  return {
    loading,
    error,
    fetchHistories,
    fetchTrash,
    addHistory,
    updateHistory,
    moveHistoryToTrash,
    restoreFromTrash,
    permanentlyDeleteHistory,
    getHistoryById,
    toggleStar,
    updateTitle,
    clearTrash,
    batchRestoreFromTrash,
    batchPermanentlyDeleteHistory,
  };
};
