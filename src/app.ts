enum ProjectStatus {
  Active,
  Finished,
}

interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHander(event: DragEvent): void;
}

const initProjects = [
  {
    id: "1",
    title: "Dummy",
    description: "Dummy Description",
    people: 3,
    status: ProjectStatus.Active,
  },
  {
    id: "2",
    title: "Dummy End",
    description: "Dummy End Description",
    people: 6,
    status: ProjectStatus.Finished,
  },
];

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type Listener<T> = (items: T[]) => void;

class State<ST> {
  protected listeners: Listener<ST>[] = [];

  addListener(listenersFn: Listener<ST>) {
    this.listeners.push(listenersFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
    this.projects = [...initProjects];
    this.initDefaultState();
  }

  private initDefaultState() {
    for (const initPrj of initProjects) {
      if (initPrj instanceof Project === false) {
        const indexOf = this.projects.findIndex(el => el.id === initPrj.id);
        const transformToProject = new Project(
          initPrj.id.toString(),
          initPrj.title,
          initPrj.description,
          initPrj.people,
          initPrj.status
        );

        this.projects[indexOf] = transformToProject;
      }
    }
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      (this.projects.length + 1).toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    for (const listenersFn of this.listeners) {
      listenersFn(this.projects.slice());
    }
  }

  public getProjects() {
    return this.projects;
  }
}

const projectState = ProjectState.getInstance();

// Validation
interface Validatable {
  value: string | number;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;

  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }

  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }

  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }

  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }

  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }

  return isValid;
}

// Auto Bind
function AutoBind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return adjDescriptor;
}

interface ComponentParam {
  templateId: string;
  hostElementId: string;
  insertPosition: InsertPosition;
  newElementId?: string;
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor({ ...options }: ComponentParam) {
    const { templateId, hostElementId, insertPosition, newElementId } = options;

    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;

    if (newElementId) this.element.id = newElementId;
    this.attach(insertPosition);
  }

  private attach(insertPos: InsertPosition = "beforeend") {
    this.hostElement.insertAdjacentElement(insertPos, this.element);
  }

  abstract configure?(): void;
  abstract render(): void;
}

class ProjectContainer extends Component<HTMLDivElement, HTMLDivElement> {
  constructor() {
    super({
      templateId: "project-container",
      hostElementId: "root",
      insertPosition: "afterbegin",
      // newElementId: ``,
    });
  }

  configure() {}
  render() {}
}

class ProjectItem
  extends Component<HTMLDivElement, HTMLElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super({
      templateId: "single-project",
      hostElementId: hostId,
      insertPosition: "beforeend",
      newElementId: `project-col-${project.id}`,
    });
    this.project = project;
    this.configure();
    this.render();
  }

  @AutoBind
  dragStartHandler(_event: DragEvent): void {}

  @AutoBind
  dragEndHandler(event: DragEvent): void {
    console.log(event);
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
  render() {
    this.element.draggable = true;
    this.element.querySelector("#subheading")!.textContent = this.project.title;
    this.element.querySelector("#content")!.textContent =
      this.project.description;
    this.element.querySelector(
      "#badge-people"
    )!.textContent = `${this.persons} assigned`;
  }
}

class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super({
      templateId: "project-list",
      hostElementId: "project-list-col",
      insertPosition: "beforeend",
      newElementId: `${type}-projects-list-section`,
    });
    this.type = type;
    this.assignedProjects = [];
    this.configure();
    this.render();
    this.renderProjects();
  }

  @AutoBind
  dragOverHandler(_event: DragEvent): void {
    const listProjectCard = this.element.querySelector(
      `.project-list-card`
    )! as HTMLDivElement;
    listProjectCard.classList.add("droppable");
  }
  @AutoBind
  dropHandler(_event: DragEvent): void {}
  @AutoBind
  dragLeaveHander(_event: DragEvent): void {
    const listProjectCard = this.element.querySelector(
      `.project-list-card`
    )! as HTMLDivElement;
    listProjectCard.classList.remove("droppable");
  }

  renderProjects() {
    const listProjectRow = this.element.querySelector(
      `#${this.type}-projects-list`
    )! as HTMLUListElement;
    listProjectRow.innerHTML = "";
    const relevantProjects = projectState.getProjects().filter(prj => {
      if (this.type === "active") {
        return prj.status === ProjectStatus.Active;
      }
      return prj.status === ProjectStatus.Finished;
    });
    this.assignedProjects = relevantProjects;
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

    projectState.addListener((_projects: Project[]) => {
      this.renderProjects();
    });
  }

  render() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("#project-list-row")!.id = listId;
    const titleProjectList = this.element.querySelector(
      "#title-projects-list"
    )! as HTMLHeadingElement;
    titleProjectList.textContent = this.type + " Projects";
  }
}

class ProjectInput extends Component<HTMLDivElement, HTMLDivElement> {
  formElement: HTMLFormElement;
  titleInputEl: HTMLInputElement;
  descriptionInputEl: HTMLInputElement;
  peopleInputEl: HTMLInputElement;

  constructor() {
    super({
      templateId: "project-input",
      hostElementId: "project-input-col",
      insertPosition: "beforeend",
    });

    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;

    this.formElement = this.element.querySelector("form") as HTMLFormElement;

    this.titleInputEl = this.formElement.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputEl = this.formElement.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputEl = this.formElement.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.configure();
  }

  private getherUserInput(): [string, string, number] | undefined {
    const enteredTitle = this.titleInputEl.value;
    const enteredDescription = this.descriptionInputEl.value;
    const enteredPeople = +this.peopleInputEl.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 10,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid Input, Please try again");
      return;
    }

    return [enteredTitle, enteredDescription, enteredPeople];
  }

  private clearInput() {
    this.titleInputEl.value = "";
    this.descriptionInputEl.value = "";
    this.peopleInputEl.value = "";
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getherUserInput();

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInput();
    }
  }

  render(): void {}

  configure() {
    this.formElement.addEventListener("submit", this.submitHandler);
  }
}

const projectContainer = new ProjectContainer();
const projectInput = new ProjectInput();
const projectListActive = new ProjectList("active");
const projectListFinished = new ProjectList("finished");
