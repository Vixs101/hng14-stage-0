(() => {
  const todoCard = window.todoCard = window.todoCard || {};

  todoCard.renderTodoView = function renderTodoView(todoState, elements) {
    elements.title.textContent = todoState.title;
    todoCard.renderDescription(todoState, elements);
    elements.dueDate.textContent = todoCard.formatDueDate(todoState.dueDate);
    elements.dueDate.setAttribute('datetime', todoState.dueDate.toISOString());
    todoCard.renderPriority(todoState.priority, elements);
    todoCard.renderStatus(todoState, elements);
    todoCard.renderRemainingTime(todoState, elements);
  };

  todoCard.renderPriority = function renderPriority(priority, elements) {
    const priorityClassName = `priority-${priority.toLowerCase()}`;

    elements.priorityBadge.textContent = `${priority} Priority`;
    elements.priorityBadge.setAttribute('aria-label', `Priority: ${priority}`);
    elements.priorityBadge.className = `badge badge-priority ${priorityClassName}`;
    elements.priorityIndicator.className = `priority-indicator ${priorityClassName}`;
    elements.priorityIndicator.setAttribute('aria-label', `Priority indicator: ${priority}`);
    elements.rootCard.classList.remove('priority-low', 'priority-medium', 'priority-high');
    elements.rootCard.classList.add(priorityClassName);
  };

  todoCard.renderDescription = function renderDescription(todoState, elements) {
    const shouldCollapse = todoState.description.length > todoCard.DESCRIPTION_COLLAPSE_THRESHOLD;
    const isExpanded = shouldCollapse && todoState.isDescriptionExpanded;

    elements.collapsibleSection.classList.toggle('is-collapsed', shouldCollapse && !isExpanded);
    elements.description.textContent = shouldCollapse && !isExpanded
      ? todoCard.getCollapsedDescription(todoState.description)
      : todoState.description;

    if (!shouldCollapse) {
      todoState.isDescriptionExpanded = false;
      elements.expandToggle.hidden = true;
      elements.expandToggle.setAttribute('aria-expanded', 'false');
      elements.expandToggle.textContent = 'Show more';
      return;
    }

    elements.expandToggle.hidden = false;
    elements.expandToggle.setAttribute('aria-expanded', String(isExpanded));
    elements.expandToggle.textContent = isExpanded ? 'Show less' : 'Show more';
  };

  todoCard.renderStatus = function renderStatus(todoState, elements) {
    const completed = todoState.status === 'Done';
    const statusClass = todoCard.getStatusClassName(todoState.status);

    todoState.completed = completed;
    elements.toggleCheckbox.checked = completed;
    elements.statusControl.value = todoState.status;
    elements.rootCard.classList.toggle('is-completed', completed);
    elements.rootCard.classList.remove('status-pending', 'status-in-progress', 'status-done');
    elements.rootCard.classList.add(`status-${statusClass}`);
    elements.statusBadge.textContent = todoState.status;
    elements.statusBadge.className = `badge badge-status ${statusClass}`;
    elements.statusBadge.setAttribute('aria-label', `Status: ${todoState.status}`);
  };

  todoCard.renderRemainingTime = function renderRemainingTime(todoState, elements) {
    if (todoState.status === 'Done') {
      todoCard.updateTimeDisplay('Completed', false, elements);
      return;
    }

    const remainingState = todoCard.getRemainingTimeState(todoState.dueDate);
    todoCard.updateTimeDisplay(remainingState.text, remainingState.isOverdue, elements);
  };

  todoCard.updateTimeDisplay = function updateTimeDisplay(text, isOverdue, elements) {
    if (elements.timeRemaining.textContent !== text) {
      elements.timeRemaining.textContent = text;
    }

    elements.timeRemaining.style.color = isOverdue ? 'var(--danger)' : 'var(--warning)';
    elements.overdueIndicator.hidden = !isOverdue;
    elements.overdueIndicator.textContent = isOverdue ? 'Overdue' : '';
    elements.rootCard.classList.toggle('is-overdue', isOverdue);
  };

  todoCard.populateEditForm = function populateEditForm(todoState, elements) {
    elements.editTitleInput.value = todoState.title;
    elements.editDescriptionInput.value = todoState.description;
    elements.editPrioritySelect.value = todoState.priority;
    elements.editDueDateInput.value = todoCard.formatDateTimeLocalValue(todoState.dueDate);
  };

  todoCard.openEditMode = function openEditMode(todoState, elements) {
    todoCard.populateEditForm(todoState, elements);
    elements.rootCard.classList.add('is-editing');
    elements.viewMode.hidden = true;
    elements.editMode.hidden = false;
    elements.editTitleInput.focus();
    elements.editTitleInput.select();
  };

  todoCard.closeEditMode = function closeEditMode(elements) {
    elements.rootCard.classList.remove('is-editing');
    elements.editMode.hidden = true;
    elements.viewMode.hidden = false;
    elements.editButton.focus();
  };

  todoCard.syncRemainingTimeTimer = function syncRemainingTimeTimer(todoState, elements) {
    if (todoCard.remainingTimeIntervalId !== null) {
      clearInterval(todoCard.remainingTimeIntervalId);
      todoCard.remainingTimeIntervalId = null;
    }

    todoCard.renderRemainingTime(todoState, elements);

    if (todoState.status === 'Done') {
      return;
    }

    todoCard.remainingTimeIntervalId = setInterval(() => {
      todoCard.renderRemainingTime(todoState, elements);
    }, todoCard.TIME_UPDATE_INTERVAL_MS);
  };
})();
