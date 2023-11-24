import React from 'react';

const MyPage = () => {
    return (
        <div className="flex">
            <div className="w-1/4 p-4 bg-gray-200">
                <h3 className="text-xl font-semibold mb-4">Navigation</h3>
                <ul>
                    <li className="mb-2"><a href="#">Home</a></li>
                    <li className="mb-2"><a href="#">My Library</a></li>
                    <li className="mb-2"><a href="#">Ask AI</a></li>
                    <li className="mb-2"><a href="#">Courses</a></li>
                    <li className="mb-2"><a href="#">Books</a></li>
                    <li className="mb-2"><a href="#">Studylists</a></li>
                    <li className="mb-2"><a href="#">Questions</a></li>
                    <li className="mb-2"><a href="#">Recent Documents</a></li>
                </ul>
            </div>
            <div className="w-3/4 p-4">
                <h1 className="text-2xl font-semibold mb-4">My Recent Documents</h1>
                <ul>
                    <li className="mb-2"><a href="#">Conocemos la letra f- nombres, en textos</a></li>
                    <li className="mb-2"><a href="#">Matematica I</a></li>
                    {/* Add more recent documents here */}
                </ul>

                <h2 className="text-xl font-semibold mt-4">Recommended Documents</h2>
                <ul>
                    <li className="mb-2"><a href="#">12. Inflation. Types, Causes and Effects by Govt. Degree College Pampore</a></li>
                    <li className="mb-2"><a href="#">SPM Unit 4 PDF and Notes</a></li>
                    {/* Add more recommended documents here */}
                </ul>
            </div>
        </div>
    );
};

export default MyPage;
