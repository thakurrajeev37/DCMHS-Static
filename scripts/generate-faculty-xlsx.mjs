import XLSX from "xlsx";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const facultyData = [
	{
		name: "Sub. Diwan Chand",
		role: "Chairman",
		category: "leadership",
		qualification: "Ph.D, M.Ed",
		experience: "25+ Years",
		image: "/founder.JPG",
		description: "Visionary leader guiding the institution towards excellence",
	},
	{
		name: "Reena Rani",
		role: "Principal",
		category: "leadership",
		qualification: "M.Ed, B.Ed",
		experience: "20+ Years",
		image: "/Principal.jpeg",
		description: "Leading with vision and dedication to excellence in education",
	},
	{
		name: "Sandeep Kumar",
		role: "Vice Principal",
		category: "leadership",
		qualification: "M.A, B.Ed",
		experience: "15+ Years",
		image: "/VicePrincipal.JPG",
		description: "Supporting academic excellence and student development",
	},
	{
		name: "Head Teacher - Primary",
		role: "Head Teacher",
		category: "teacher",
		qualification: "M.Ed, B.Ed",
		experience: "12+ Years",
		image: "/headTeacher.jpg",
		description: "Expert in early childhood education",
	},
	{
		name: "Senior Teacher - Science",
		role: "Science Department",
		category: "teacher",
		qualification: "M.Sc, B.Ed",
		experience: "10+ Years",
		image: "/teacher-2.jpg",
		description: "Making science engaging",
	},
	{
		name: "Senior Teacher - Mathematics",
		role: "Mathematics Department",
		category: "teacher",
		qualification: "M.Sc, B.Ed",
		experience: "10+ Years",
		image: "/teacher-3.jpg",
		description: "Building strong foundations",
	},
	{
		name: "Senior Teacher - English",
		role: "English Department",
		category: "teacher",
		qualification: "M.A, B.Ed",
		experience: "8+ Years",
		image: "/teacher-4.jpg",
		description: "Fostering language skills",
	},
	{
		name: "Teacher - Social Studies",
		role: "Social Studies Department",
		category: "teacher",
		qualification: "M.A, B.Ed",
		experience: "7+ Years",
		image: "/teacher-5.jpg",
		description: "Making history come alive",
	},
	{
		name: "Teacher - Computer Science",
		role: "IT Department",
		category: "teacher",
		qualification: "MCA, B.Ed",
		experience: "6+ Years",
		image: "/teacher-6.jpg",
		description: "Preparing for digital future",
	},
];

const worksheet = XLSX.utils.json_to_sheet(facultyData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Faculty");

const outputPath = path.resolve(__dirname, "../public/faculty.xlsx");
XLSX.writeFile(workbook, outputPath);

console.log(`✅ Faculty xlsx file created at: ${outputPath}`);
