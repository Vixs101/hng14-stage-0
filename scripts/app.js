(() => {
  const todoCard = window.todoCard = window.todoCard || {};

  function handleToggleCheckboxChange(event, todoState, elements) {
    todoCard.syncStatusFromCheckbox(event.target.checked, todoState);
    todoCard.renderStatus(todoState, elements);
    todoCard.syncRemainingTimeTimer(todoState, elements);
  }

  function handleStatusControlChange(event, todoState, elements) {
    todoCard.syncCheckboxFromStatus(event.target.value, todoState);
    todoCard.renderStatus(todoState, elements);
    todoCard.syncRemainingTimeTimer(todoState, elements);
  }

  function handleEditButtonClick(todoState, elements) {
    todoCard.openEditMode(todoState, elements);
  }

  function handleExpandToggleClick(todoState, elements) {
    todoState.isDescriptionExpanded = !todoState.isDescriptionExpanded;
    todoCard.renderDescription(todoState, elements);
  }

  function handleEditFormSubmit(event, todoState, elements) {
    event.preventDefault();

    const updatedTodo = {
      title: elements.editTitleInput.value.trim() || todoState.title,
      description: elements.editDescriptionInput.value.trim() || todoState.description,
      priority: elements.editPrioritySelect.value,
      dueDate: todoCard.getSafeDueDate(elements.editDueDateInput.value, todoState.dueDate)
    };

    todoState.title = updatedTodo.title;
    todoState.description = updatedTodo.description;
    todoState.isDescriptionExpanded = false;
    todoState.priority = updatedTodo.priority;
    todoState.dueDate = updatedTodo.dueDate;

    todoCard.renderTodoView(todoState, elements);
    todoCard.syncRemainingTimeTimer(todoState, elements);
    todoCard.closeEditMode(elements);
  }

  function handleCancelButtonClick(elements) {
    todoCard.closeEditMode(elements);
  }

  function handleDeleteButtonClick() {
    alert('Delete clicked');
  }

  todoCard.bindEventListeners = function bindEventListeners(todoState, elements) {
    elements.toggleCheckbox.addEventListener('change', (event) => {
      handleToggleCheckboxChange(event, todoState, elements);
    });

    elements.statusControl.addEventListener('change', (event) => {
      handleStatusControlChange(event, todoState, elements);
    });

    elements.editButton.addEventListener('click', () => {
      handleEditButtonClick(todoState, elements);
    });

    elements.expandToggle.addEventListener('click', () => {
      handleExpandToggleClick(todoState, elements);
    });

    elements.editForm.addEventListener('submit', (event) => {
      handleEditFormSubmit(event, todoState, elements);
    });

    elements.cancelButton.addEventListener('click', () => {
      handleCancelButtonClick(elements);
    });

    elements.deleteButton.addEventListener('click', () => {
      handleDeleteButtonClick();
    });
  };

  function initializeTodoCard() {
    const elements = todoCard.getElements();
    const todoState = todoCard.createInitialTodoState(elements);

    todoCard.renderTodoView(todoState, elements);
    todoCard.bindEventListeners(todoState, elements);
    todoCard.syncRemainingTimeTimer(todoState, elements);
  }

  function registerInitialization() {
    document.addEventListener('DOMContentLoaded', () => {
      initializeTodoCard();
    });
  }

  function ensureTodoCardNamespace() {
    if (!window.todoCard) {
      window.todoCard = {};
    }
  }

  function bootstrapTodoCard() {
    ensureTodoCardNamespace();
    registerInitialization();
  }

  bootstrapTodoCard();
})();
