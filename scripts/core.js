(() => {
  const todoCard = window.todoCard = window.todoCard || {};

  todoCard.DESCRIPTION_COLLAPSE_THRESHOLD = 120;
  todoCard.TIME_UPDATE_INTERVAL_MS = 30000;
  todoCard.remainingTimeIntervalId = null;

  todoCard.getElements = function getElements() {
    return {
      rootCard: document.querySelector('[data-testid="test-todo-card"]'),
      viewMode: document.querySelector('[data-view-mode]'),
      editMode: document.querySelector('.todo-edit'),
      title: document.querySelector('[data-testid="test-todo-title"]'),
      description: document.querySelector('[data-testid="test-todo-description"]'),
      collapsibleSection: document.querySelector('[data-testid="test-todo-collapsible-section"]'),
      expandToggle: document.querySelector('[data-testid="test-todo-expand-toggle"]'),
      priorityBadge: document.querySelector('[data-testid="test-todo-priority"]'),
      priorityIndicator: document.querySelector('[data-testid="test-todo-priority-indicator"]'),
      statusBadge: document.querySelector('[data-testid="test-todo-status"]'),
      statusControl: document.querySelector('[data-testid="test-todo-status-control"]'),
      dueDate: document.querySelector('[data-testid="test-todo-due-date"]'),
      timeRemaining: document.querySelector('[data-testid="test-todo-time-remaining"]'),
      overdueIndicator: document.querySelector('[data-testid="test-todo-overdue-indicator"]'),
      toggleCheckbox: document.querySelector('[data-testid="test-todo-complete-toggle"]'),
      editButton: document.querySelector('[data-testid="test-todo-edit-button"]'),
      deleteButton: document.querySelector('[data-testid="test-todo-delete-button"]'),
      editForm: document.querySelector('[data-testid="test-todo-edit-form"]'),
      editTitleInput: document.querySelector('[data-testid="test-todo-edit-title-input"]'),
      editDescriptionInput: document.querySelector('[data-testid="test-todo-edit-description-input"]'),
      editPrioritySelect: document.querySelector('[data-testid="test-todo-edit-priority-select"]'),
      editDueDateInput: document.querySelector('[data-testid="test-todo-edit-due-date-input"]'),
      saveButton: document.querySelector('[data-testid="test-todo-save-button"]'),
      cancelButton: document.querySelector('[data-testid="test-todo-cancel-button"]')
    };
  };

  todoCard.createInitialTodoState = function createInitialTodoState(elements) {
    const dueDate = todoCard.getDefaultDueDate();

    return {
      title: elements.title.textContent.trim(),
      description: elements.description.textContent.trim(),
      isDescriptionExpanded: false,
      priority: todoCard.getPriorityFromBadge(elements.priorityBadge.textContent),
      dueDate,
      status: todoCard.getStatusFromText(elements.statusBadge.textContent),
      completed: elements.toggleCheckbox.checked
    };
  };

  todoCard.getDefaultDueDate = function getDefaultDueDate() {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3);
    dueDate.setHours(12, 0, 0, 0);
    return dueDate;
  };

  todoCard.getPriorityFromBadge = function getPriorityFromBadge(priorityText) {
    const normalized = priorityText.trim().toLowerCase();

    if (normalized.startsWith('low')) {
      return 'Low';
    }

    if (normalized.startsWith('medium')) {
      return 'Medium';
    }

    return 'High';
  };

  todoCard.getStatusFromText = function getStatusFromText(statusText) {
    const normalized = statusText.trim().toLowerCase();

    if (normalized === 'pending') {
      return 'Pending';
    }

    if (normalized === 'done') {
      return 'Done';
    }

    return 'In Progress';
  };

  todoCard.formatDueDate = function formatDueDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return `Due ${date.toLocaleDateString('en-US', options)}`;
  };

  todoCard.formatDateTimeLocalValue = function formatDateTimeLocalValue(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  todoCard.getRemainingTimeState = function getRemainingTimeState(date) {
    const now = new Date();
    const diffMs = date - now;
    const absDiffMs = Math.abs(diffMs);
    const diffMinutes = Math.floor(absDiffMs / (1000 * 60));
    const diffHours = Math.floor(absDiffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(absDiffMs / (1000 * 60 * 60 * 24));
    const relativeText = todoCard.getRelativeTimeUnitText(diffDays, diffHours, diffMinutes);

    if (diffMs < 0) {
      return {
        text: `Overdue by ${relativeText}`,
        isOverdue: true
      };
    }

    return {
      text: `Due in ${relativeText}`,
      isOverdue: false
    };
  };

  todoCard.getRelativeTimeUnitText = function getRelativeTimeUnitText(diffDays, diffHours, diffMinutes) {
    if (diffDays >= 1) {
      return todoCard.formatTimeUnit(diffDays, 'day');
    }

    if (diffHours >= 1) {
      return todoCard.formatTimeUnit(diffHours, 'hour');
    }

    return todoCard.formatTimeUnit(Math.max(diffMinutes, 0), 'minute');
  };

  todoCard.formatTimeUnit = function formatTimeUnit(value, unit) {
    const safeValue = Math.max(value, 0);
    const suffix = safeValue === 1 ? unit : `${unit}s`;
    return `${safeValue} ${suffix}`;
  };

  todoCard.getCollapsedDescription = function getCollapsedDescription(description) {
    const truncated = description.slice(0, todoCard.DESCRIPTION_COLLAPSE_THRESHOLD).trimEnd();
    return `${truncated}...`;
  };

  todoCard.getStatusClassName = function getStatusClassName(status) {
    if (status === 'Pending') {
      return 'pending';
    }

    if (status === 'Done') {
      return 'done';
    }

    return 'in-progress';
  };

  todoCard.syncStatusFromCheckbox = function syncStatusFromCheckbox(isChecked, todoState) {
    todoState.status = isChecked ? 'Done' : 'Pending';
  };

  todoCard.syncCheckboxFromStatus = function syncCheckboxFromStatus(status, todoState) {
    todoState.status = status;
    todoState.completed = status === 'Done';
  };

  todoCard.getSafeDueDate = function getSafeDueDate(dateTimeValue, fallbackDate) {
    const parsedDate = new Date(dateTimeValue);

    if (Number.isNaN(parsedDate.getTime())) {
      return fallbackDate;
    }

    return parsedDate;
  };
})();
