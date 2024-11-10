function generateResume(): void {
    // Get form values
    const name: string = (document.getElementById('fullName') as HTMLInputElement).value;
    const email: string = (document.getElementById('email') as HTMLInputElement).value;
    const phone: string = (document.getElementById('phone') as HTMLInputElement).value;
    const location: string = (document.getElementById('location') as HTMLInputElement).value;
    const portfolio: string = (document.getElementById('portfolio') as HTMLInputElement).value;
    const linkedin: string = (document.getElementById('linkedin') as HTMLInputElement).value;
    const github: string = (document.getElementById('github') as HTMLInputElement).value;
    const summary: string = (document.getElementById('summary') as HTMLInputElement).value;
    const jobTitle: string = (document.getElementById('jobTitle1') as HTMLInputElement).value;
    const company: string = (document.getElementById('company1') as HTMLInputElement).value;
    const dates: string = (document.getElementById('dates1') as HTMLInputElement).value;
    const responsibilities: string = (document.getElementById('responsibilities1') as HTMLInputElement).value;
    const degree: string = (document.getElementById('degree') as HTMLInputElement).value;
    const school: string = (document.getElementById('school') as HTMLInputElement).value;
    const gradYear: string = (document.getElementById('gradYear') as HTMLInputElement).value;
    const eduDescription: string = (document.getElementById('eduDescription') as HTMLInputElement).value;
    const skills: string = (document.getElementById('skills') as HTMLInputElement).value;

    // Set values in resume template
    (document.getElementById('resumeName') as HTMLElement).innerText = name;
    (document.getElementById('resumeEmail') as HTMLElement).innerHTML = `<i class="fas fa-envelope"></i> <b>Email:</b> ${email}`;
    (document.getElementById('resumeContact') as HTMLElement).innerHTML = `<i class="fas fa-phone"></i> <b>Phone:</b> ${phone}`;
    (document.getElementById('resumeLocation') as HTMLElement).innerHTML = `<i class="fas fa-map-marker-alt"></i> <b>Location:</b> ${location}`;
    
    // Set LinkedIn link with "LinkedIn" text
    const portfolioElement = document.getElementById('resumePortfolio') as HTMLAnchorElement;
    portfolioElement.innerHTML = `<i class="fas fa-link"></i> Portfolio`;
    portfolioElement.href = portfolio;
    portfolioElement.target = "_blank"; // Opens in a new tab

    // Set LinkedIn link with "LinkedIn" text
    const linkedinElement = document.getElementById('resumeLinkedIn') as HTMLAnchorElement;
    linkedinElement.innerHTML = `<i class="fab fa-linkedin"></i> LinkedIn`;
    linkedinElement.href = linkedin;
    linkedinElement.target = "_blank"; // Opens in a new tab

    // Set LinkedIn link with "LinkedIn" text
    const githubElement = document.getElementById('resumeGithub') as HTMLAnchorElement;
    githubElement.innerHTML = `<i class="fab fa-github"></i> GitHub`;
    githubElement.href = github;
    githubElement.target = "_blank"; // Opens in a new tab

    (document.getElementById('resumeSummary') as HTMLElement).innerText = summary;

    // Work experience section with icons
    const experienceHTML = `
        <div class="experience-item">
            <div class="job-title"><i class="fas fa-briefcase"></i> ${jobTitle}</div>
            <div class="company"><i class="fas fa-building"></i> ${company}</div>
            <div class="date"><i class="fas fa-calendar-alt"></i> ${dates}</div>
            <div class="description">${responsibilities}</div>
        </div>`;
    (document.getElementById('resumeExperience') as HTMLElement).innerHTML = experienceHTML;

    // Education section with icons
    const educationHTML = `
        <div class="education-item">
            <div class="degree"><i class="fas fa-graduation-cap"></i> ${degree}</div>
            <div class="school"><i class="fas fa-school"></i> ${school}</div>
            <div class="date"><i class="fas fa-calendar-alt"></i> ${gradYear}</div>
            <div class="description">${eduDescription}</div>
        </div>`;
    (document.getElementById('resumeEducation') as HTMLElement).innerHTML = educationHTML;

    // Skills section
    const skillItems = skills.split(',').map(skill => `<div class="skill"><i class="fas fa-check-circle"></i> ${skill.trim()}</div>`).join('');
    (document.getElementById('resumeSkills') as HTMLElement).innerHTML = skillItems;

    // Show the resume template
    (document.getElementById('resumeTemplate') as HTMLElement).style.display = 'block';
}

// Function to load profile picture
function loadPhotos(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const reader = new FileReader();
    reader.onload = function() {
        const resumePhoto = document.getElementById('resumePhoto') as HTMLImageElement;
        resumePhoto.src = reader.result as string;
        resumePhoto.style.display = 'block'; // Ensure photo is displayed
    };
    if (fileInput.files && fileInput.files[0]) {
        reader.readAsDataURL(fileInput.files[0]);
    }
}
// / Make sections editable
const makeSectionsEditable = (element: HTMLElement) => {
    element.contentEditable = "true";
    element.addEventListener('blur', () => {
        // Optionally add logic here to handle saving changes if needed
    });
};

// Add Editable Functionality
const FullName = document.getElementById('resumeName') as HTMLElement;
const Email = document.getElementById('resumeEmail') as HTMLElement;
const Contact = document.getElementById('resumeContact') as HTMLElement;
const Locations = document.getElementById('resumeLocation') as HTMLElement;
const Experience = document.getElementById('resumeExperience') as HTMLElement;
const Summary = document.getElementById('resumeSummary') as HTMLElement;
const Education = document.getElementById('resumeEducation') as HTMLElement;
const Skills = document.getElementById('resumeSkills') as HTMLElement;

if (FullName) makeSectionsEditable(FullName);
if (Email) makeSectionsEditable(Email);
if (Contact) makeSectionsEditable(Contact);
if (Locations) makeSectionsEditable(Locations);
if (Experience) makeSectionsEditable(Experience);
if (Summary) makeSectionsEditable(Summary);
if (Education) makeSectionsEditable(Education);
if (Skills) makeSectionsEditable(Skills);

// Define interfaces for our types
interface ResumeOptions {
    margin: number;
    filename: string;
    image: {
        type: string;
        quality: number;
    };
    html2canvas: {
        scale: number;
    };
    jsPDF: {
        unit: string;
        format: string;
        orientation: string;
    };
}

interface ShareLinkContainer extends HTMLDivElement {
    className: string;
    innerHTML: string;
}

// Declare html2pdf to avoid TypeScript errors
declare const html2pdf: any;

const downloadResume = (): void => {
    // Hide the download and share buttons temporarily for PDF
    const actionButtons: HTMLElement | null = document.querySelector('.action-buttons');
    if (actionButtons) {
        actionButtons.style.display = 'none';
    }

    const element: HTMLElement | null = document.getElementById('resumeTemplate');
    const nameElement: HTMLInputElement | null = document.getElementById('fullName') as HTMLInputElement;
    const name: string = nameElement?.value || 'resume';
    const fileName: string = `${name.replace(/\s+/g, '_')}_resume.pdf`;

    const opt: ResumeOptions = {
        margin: 1,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate PDF
    if (element) {
        html2pdf().set(opt).from(element).save().then(() => {
            // Show the buttons again after PDF is generated
            if (actionButtons) {
                actionButtons.style.display = 'flex';
            }
        });
    }
};

const generateShareableLink = (): void => {
    const nameElement: HTMLInputElement | null = document.getElementById('fullName') as HTMLInputElement;
    const name: string = nameElement?.value || '';
    const timestamp: number = Date.now();
    const uniqueId: string = `${name.toLowerCase().replace(/\s+/g, '-')}-${timestamp}`;
    
    // Save resume data to localStorage
    const resumeTemplate: HTMLElement | null = document.getElementById('resumeTemplate');
    if (resumeTemplate) {
        const clonedTemplate: Node = resumeTemplate.cloneNode(true);
        localStorage.setItem(`resume_${uniqueId}`, (clonedTemplate as HTMLElement).outerHTML);
    }
    
    // Create shareable link
    const shareableURL: string = `${window.location.origin}/view.html?id=${uniqueId}`;
    
    // Show the shareable link
    const linkContainer: ShareLinkContainer = document.createElement('div') as ShareLinkContainer;
    linkContainer.className = 'share-link-container';
    linkContainer.innerHTML = `
        <div class="share-link-box">
            <p>✨ Your resume link is ready:</p>
            <div class="link-input-group">
                <input type="text" value="${shareableURL}" readonly class="share-link-input">
                <button onclick="copyToClipboard('${shareableURL}')" class="copy-btn">
                    <i class="fas fa-copy"></i> Copy
                </button>
            </div>
            <p class="share-note">⚡ This link will work until you clear your browser data</p>
            <button onclick="closeShareDialog(this.parentElement)" class="close-btn">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(linkContainer);
};

const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text).then(() => {
        const copyBtn: HTMLElement | null = document.querySelector('.copy-btn');
        if (copyBtn) {
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            }, 2000);
        }
    });
};

const closeShareDialog = (element: HTMLElement | null): void => {
    element?.parentElement?.remove();
};

const addActionButtons = (): void => {
    const buttonContainer: HTMLDivElement = document.createElement('div');
    buttonContainer.className = 'action-buttons';
    buttonContainer.innerHTML = `
        <button onclick="downloadResume()" class="action-btn download-btn">
            <i class="fas fa-file-pdf"></i>Download PDF
        </button>
        <button onclick="generateShareableLink()" class="action-btn share-btn">
            <i class="fas fa-share-alt"></i>Share Resume
        </button>
    `;
    
    const resumeElement: HTMLElement | null = document.querySelector('.resume');
    resumeElement?.appendChild(buttonContainer);
};

// Add type for window load event
window.onload = (): void => {
    addActionButtons();
};