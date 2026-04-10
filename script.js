document.addEventListener('DOMContentLoaded', () => {
    const rootCard = document.querySelector('[data-testid="test-todo-card"]');
    const dueDateElement = document.querySelector('[data-testid="test-todo-due-date"]');
    const timeRemainingElement = document.querySelector('[data-testid="test-todo-time-remaining"]');
    const statusBadge = document.querySelector('[data-testid="test-todo-status"]');
    const toggleCheckbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
    const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
    const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(12, 0, 0, 0); 
    
    function getFormattedDate(date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return `Due ${date.toLocaleDateString('en-US', options)}`;
    }

    dueDateElement.textContent = getFormattedDate(targetDate);
    dueDateElement.parentElement.parentElement.querySelector('time').setAttribute('datetime', targetDate.toISOString());

    function updateRemainingTime() {
        if (!timeRemainingElement) return;

        const now = new Date();
        const diffMs = targetDate - now;

        const msInHour = 1000 * 60 * 60;
        const diffHours = Math.floor(diffMs / msInHour);
        const diffDays = Math.floor(diffHours / 24);

        let friendlyText = "";

        if (diffMs < 0) {
            const overHours = Math.abs(diffHours);
            if (overHours < 24) {
                friendlyText = `Overdue by ${overHours} hours`;
            } else {
                friendlyText = `Overdue by ${Math.abs(diffDays)} days`;
            }
        } else {
            if (diffHours < 1) {
                friendlyText = "Due now!";
            } else if (diffHours < 24) {
                friendlyText = `Due in ${diffHours} hours`;
            } else if (diffDays === 1) {
                friendlyText = "Due tomorrow";
            } else {
                friendlyText = `Due in ${diffDays} days`;
            }
        }

        if (timeRemainingElement.textContent !== friendlyText) {
            timeRemainingElement.textContent = friendlyText;
            
            if (diffMs < 0) {
                timeRemainingElement.style.color = 'var(--danger)';
            }
        }
    }

    updateRemainingTime();
    setInterval(updateRemainingTime, 60000);

    toggleCheckbox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        
        if (isChecked) {
            rootCard.classList.add('is-completed');
            statusBadge.textContent = 'Done';
            statusBadge.className = 'badge badge-status done';
            statusBadge.setAttribute('aria-label', 'Status: Done');
        } else {
            rootCard.classList.remove('is-completed');
            statusBadge.textContent = 'In Progress';
            statusBadge.className = 'badge badge-status';
            statusBadge.setAttribute('aria-label', 'Status: In Progress');
        }
    });

    editBtn.addEventListener('click', () => {
        alert('Edit clicked');
    });

    deleteBtn.addEventListener('click', () => {
        alert('Delete clicked');
    });
});
