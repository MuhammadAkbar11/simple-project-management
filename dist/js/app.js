"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
const initProjects = [
    {
        id: "1",
        title: "Dummy",
        description: "Dummy Description",
        people: 3,
        status: ProjectStatus.Active,
        order: 1,
    },
    {
        id: "2",
        title: "Dummy 2 ",
        description: "Dummy Description 2",
        people: 4,
        status: ProjectStatus.Active,
        order: 2,
    },
    {
        id: "3",
        title: "Dummy End",
        description: "Dummy End Description",
        people: 6,
        status: ProjectStatus.Active,
        order: 3,
    },
];
class Project {
    constructor(id, title, description, people, status, order) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
        this.order = order;
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenersFn) {
        this.listeners.push(listenersFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projectActiveId = null;
        this.projectIdInc = 1;
        this.projects = [];
        this.projects = [...initProjects];
        this.initDefaultState();
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    initDefaultState() {
        for (const initPrj of initProjects) {
            if (initPrj instanceof Project === false) {
                const indexOf = this.projects.findIndex(el => el.id === initPrj.id);
                const transformToProject = new Project(this.projectIdInc.toString(), initPrj.title, initPrj.description, initPrj.people, initPrj.status, this.projectIdInc);
                this.projectIdInc++ + 1;
                this.projects[indexOf] = transformToProject;
            }
        }
    }
    setProjectActiveId(id) {
        this.projectActiveId = id;
    }
    getProjectActiveId() {
        return this.projectActiveId;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new Project(this.projectIdInc.toString(), title, description, numOfPeople, ProjectStatus.Active, this.projectIdInc);
        this.projects.push(newProject);
        this.projectIdInc++ + 1;
        this.updateListeners();
    }
    findOne(projectId) {
        return this.projects.find(prj => prj.id === projectId);
    }
    moveProject(projectId, newStatus) {
        const selectedProject = this.findOne(projectId);
        if (selectedProject && selectedProject.status !== newStatus) {
            selectedProject.status = newStatus;
            this.updateListeners();
        }
    }
    deleteProject(projectId) {
        const updatedProjects = this.projects.filter(prj => prj.id !== projectId);
        this.projects = updatedProjects;
        this.updateListeners();
    }
    swapProject(fromId, toId) {
        const fromIndex = this.projects.findIndex(el => el.id === fromId);
        const toIndex = this.projects.findIndex(el => el.id === toId);
        const fromOrder = this.projects[fromIndex].order;
        const toOrder = this.projects[toIndex].order;
        this.projects[fromIndex].order = +toOrder;
        this.projects[toIndex].order = +fromOrder;
        this.updateListeners();
    }
    updateListeners() {
        for (const listenersFn of this.listeners) {
            listenersFn(this.projects.slice());
        }
    }
    getProjects() {
        return this.projects;
    }
}
const projectState = ProjectState.getInstance();
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
// Auto Bind
function AutoBind(_target, _methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class Component {
    constructor(_a) {
        var options = __rest(_a, []);
        const { templateId, hostElementId, insertPosition, newElementId } = options;
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId)
            this.element.id = newElementId;
        this.attach(insertPosition);
    }
    attach(insertPos = "beforeend") {
        this.hostElement.insertAdjacentElement(insertPos, this.element);
    }
}
class ProjectContainer extends Component {
    constructor() {
        super({
            templateId: "project-container",
            hostElementId: "root",
            insertPosition: "afterbegin",
            // newElementId: ``,
        });
    }
    configure() { }
    render() { }
}
class ProjectItem extends Component {
    constructor(hostId, project) {
        super({
            templateId: "single-project",
            hostElementId: hostId,
            insertPosition: "beforeend",
            newElementId: `project-col-${project.id}`,
        });
        this.project = project;
        this.btnDelete = this.element.querySelector("#btn-delete");
        this.configure();
        this.render();
    }
    get persons() {
        if (this.project.people === 1) {
            return "1 person";
        }
        else {
            return `${this.project.people} persons`;
        }
    }
    dragStartHandler(event) {
        projectState.setProjectActiveId(this.project.id);
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(_event) {
        console.log("END", this.project.title);
    }
    dragEnterHandler(_event) {
        if (this.project.id !== projectState.getProjectActiveId()) {
            this.element.classList.add("over");
            // console.log(event.target.c)
        }
    }
    dragLeaveHandler(_event) {
        this.element.classList.remove("over");
    }
    dragDropHandler(_event) {
        projectState.swapProject(projectState.getProjectActiveId(), this.project.id);
        this.element.classList.remove("bg-light");
    }
    dragDragOver(event) {
        event.preventDefault();
    }
    deleteItemHandler(_event) {
        projectState.deleteProject(this.project.id);
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
        this.element.addEventListener("dragenter", this.dragEnterHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("dragover", this.dragDragOver);
        this.element.addEventListener("drop", this.dragDropHandler);
        this.btnDelete.addEventListener("click", this.deleteItemHandler);
    }
    render() {
        this.element.draggable = true;
        this.element.querySelector("#subheading").textContent = this.project.title;
        this.element.querySelector("#content").textContent =
            this.project.description;
        this.element.querySelector("#badge-people").textContent = `${this.persons} assigned`;
    }
}
__decorate([
    AutoBind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    AutoBind
], ProjectItem.prototype, "dragEndHandler", null);
__decorate([
    AutoBind
], ProjectItem.prototype, "dragEnterHandler", null);
__decorate([
    AutoBind
], ProjectItem.prototype, "dragLeaveHandler", null);
__decorate([
    AutoBind
], ProjectItem.prototype, "dragDropHandler", null);
__decorate([
    AutoBind
], ProjectItem.prototype, "dragDragOver", null);
__decorate([
    AutoBind
], ProjectItem.prototype, "deleteItemHandler", null);
class ProjectList extends Component {
    constructor(type) {
        super({
            templateId: "project-list",
            hostElementId: "project-list-col",
            insertPosition: "beforeend",
            newElementId: `${type}-projects-list-section`,
        });
        this.type = type;
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.render();
        this.renderProjects();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listProjectCard = this.element.querySelector(`.project-list-card`);
            listProjectCard.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData("text/plain");
        projectState.moveProject(prjId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
        const listProjectCard = this.element.querySelector(`.project-list-card`);
        listProjectCard.classList.remove("droppable");
    }
    dragLeaveHander(_event) {
        const listProjectCard = this.element.querySelector(`.project-list-card`);
        listProjectCard.classList.remove("droppable");
    }
    renderProjects() {
        const listProjectRow = this.element.querySelector(`#${this.type}-projects-list`);
        listProjectRow.innerHTML = "";
        const relevantProjects = projectState
            .getProjects()
            .filter(prj => {
            if (this.type === "active") {
                return prj.status === ProjectStatus.Active;
            }
            return prj.status === ProjectStatus.Finished;
        })
            .sort((a, b) => Number(b.order) - Number(a.order));
        this.assignedProjects = relevantProjects;
        console.log(this.assignedProjects);
        for (const project of this.assignedProjects) {
            if (!!project) {
                new ProjectItem(listProjectRow.id, project);
            }
        }
    }
    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHander);
        this.element.addEventListener("drop", this.dropHandler);
        projectState.addListener((_projects) => {
            this.renderProjects();
        });
    }
    render() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("#project-list-row").id = listId;
        const titleProjectList = this.element.querySelector("#title-projects-list");
        titleProjectList.textContent = this.type + " Projects";
    }
}
__decorate([
    AutoBind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    AutoBind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    AutoBind
], ProjectList.prototype, "dragLeaveHander", null);
class ProjectInput extends Component {
    constructor() {
        super({
            templateId: "project-input",
            hostElementId: "project-input-col",
            insertPosition: "beforeend",
        });
        this.templateElement = document.getElementById("project-input");
        this.formElement = this.element.querySelector("form");
        this.titleInputEl = this.formElement.querySelector("#title");
        this.descriptionInputEl = this.formElement.querySelector("#description");
        this.peopleInputEl = this.formElement.querySelector("#people");
        this.configure();
    }
    getherUserInput() {
        const enteredTitle = this.titleInputEl.value;
        const enteredDescription = this.descriptionInputEl.value;
        const enteredPeople = +this.peopleInputEl.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 10,
        };
        if (!validate(titleValidatable) ||
            !validate(descValidatable) ||
            !validate(peopleValidatable)) {
            alert("Invalid Input, Please try again");
            return;
        }
        return [enteredTitle, enteredDescription, enteredPeople];
    }
    clearInput() {
        this.titleInputEl.value = "";
        this.descriptionInputEl.value = "";
        this.peopleInputEl.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.getherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInput();
        }
    }
    render() { }
    configure() {
        this.formElement.addEventListener("submit", this.submitHandler);
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "submitHandler", null);
const projectContainer = new ProjectContainer();
const projectInput = new ProjectInput();
const projectListActive = new ProjectList("active");
const projectListFinished = new ProjectList("finished");
//# sourceMappingURL=app.js.map