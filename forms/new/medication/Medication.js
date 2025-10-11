
function Medication({ medicationId }) {
    // API call (commented out - not ready yet)
    // const fetchMedicationData = async (medicationId) => {
    //   try {
    //     const response = await fetch(`/api/medications/${medicationId}`);
    //     const data = await response.json();
    //     return data;
    //   } catch (error) {
    //     console.error('Error fetching medication data:', error);
    //   }
    // };

    // Demo data - Regular Medication(Active)
    const medicationData = {
        participant: {
            name: "Patrick Kere Giddy",
            community: "Community A",
            ndis: 517821915
        },
        medicationName: "Paracetamol",
        strength: "500mg",
        type: "medication",
        status: "Active",
        medicationInformation: {
            medicationName: "Paracetamol",
            route: "Oral",
            dosage: "500mg",
            maxDosage: 1,
            administrationEndDate: "2025-12-31T00:00:00.000Z",
            totalAdministered: 5,
            nextAdministration: "SEP 29, 2025 at 1:30PM",
            startDate: "2025-09-15T00:00:00.000Z",
            prescribingDoctor: "Dr. Jane Smith"
        },
        administrationSchedule: [],
        administrationHistory: [],
        alerts: {
            participantAllergic: "Allergic to Aspirin",
            adverseEffectsSteps: "Call Participant emergency Contact. Call 000 if required. Make sure the participant is breathing. Call the team leader to inform them at once."
        },
        emergencyContact: {
            name: "Tim Allen",
            relation: "Father",
            phone: "0416 638 601",
            email: "tim@email.com"
        },
        storageInformation: "Store in locked cupboard",
        note: "Provide with breakfast, and make observation"
    };

    // Demo data - PRN Medication (Commented out)
    // const medicationData = {
    //     participant: {
    //         name: "Shahrear Participant 15",
    //         community: "Community D",
    //         ndis: 517821915
    //     },
    //     medicationName: "Ibuprofen",
    //     strength: "400mg",
    //     type: "prn",
    //     status: "Active",
    //     medicationInformation: {
    //         medicationName: "Ibuprofen",
    //         route: "Oral",
    //         dosage: "400mg",
    //         maxDosage: 2,
    //         administrationEndDate: null,
    //         totalAdministered: 3,
    //         nextAdministration: null,
    //         startDate: "2025-10-01T00:00:00.000Z",
    //         prescribingDoctor: "Dr. Mark Wilson"
    //     },
    //     administrationSchedule: [],
    //     administrationHistory: [],
    //     alerts: {
    //         participantAllergic: "Allergic to NSAIDs",
    //         adverseEffectsSteps: "Monitor for stomach upset. Contact emergency services if severe reaction occurs."
    //     },
    //     emergencyContact: {
    //         name: "Shahrear",
    //         relation: "Family Member",
    //         phone: "0412 345 678",
    //         email: "shahrear@navigatus.com.au"
    //     },
    //     storageInformation: "Room temperature",
    //     prnSteps: [
    //         {
    //             step: "Assess pain level (1-10 scale)",
    //             order: 1,
    //             _id: "68e9adcf42bddc1a20b7598d"
    //         },
    //         {
    //             step: "If pain >= 5, administer one tablet",
    //             order: 2,
    //             _id: "68e9adcf42bddc1a20b7598e"
    //         },
    //         {
    //             step: "Reassess after 1 hour",
    //             order: 3,
    //             _id: "68e9adcf42bddc1a20b7598f"
    //         }
    //     ],
    //     prnNote: "Use for moderate pain relief"
    // };

    const handleAdminister = () => {
        console.log('Administer button clicked');
    };

    const handleRefused = () => {
        console.log('Refused button clicked');
    };

    const handleNotAdministered = () => {
        console.log('Not Administered button clicked');
    };

    return (
        <div className="pb-8">
            {/* Header */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
                <div className="flex justify-between items-center">
                    <h2 className="text-gray-900 font-semibold">
                        {medicationData.participant.name}
                    </h2>
                    <span className="text-gray-500 font-medium text-sm">
                        {medicationData.participant.community}
                    </span>
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-3 text-left">
                {/* Medication Name and Strength */}
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-base font-bold">{medicationData.medicationName}</h2>
                            {medicationData.type === "prn" && <span className="text-xs text-orange-600 bg-orange-50 border border-orange-500 rounded-full px-2">PRN</span>}
                        </div>

                        <div className="text-xs text-gray-600">{medicationData.strength}</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-wrap justify-end">
                        <button
                            onClick={handleAdminister}
                            className="px-2 py-1 bg-blue-600 text-white text-[11px] font-medium rounded hover:bg-blue-700 transition"
                        >
                            Administer
                        </button>
                        <button
                            onClick={handleRefused}
                            className="px-2 py-1 bg-red-500 text-white text-[11px] font-medium rounded hover:bg-red-600 transition"
                        >
                            Refused
                        </button>
                        {medicationData.type === "medication" && (
                            <button
                                onClick={handleNotAdministered}
                                className="px-2 py-1 bg-orange-500 text-white text-[11px] font-medium rounded hover:bg-orange-600 transition"
                            >
                                Not Administered
                            </button>
                        )}
                    </div>
                </div>

                {/* Route */}
                <div className="border border-gray-300 rounded-lg p-4 bg-white flex items-center gap-3">
                    <div className="text-gray-400 text-xl flex-shrink-0">↓</div>
                    <div className="flex justify-between w-full items-center gap-2">
                        <div className="text-xs text-gray-500">Route</div>
                        <div className="text-xs font-medium">{medicationData.medicationInformation.route}</div>
                    </div>
                </div>

                {/* Time / Next Administration */}
                <div className="border border-gray-300 rounded-lg p-4 bg-white flex items-center gap-3">
                    <span className="text-gray-400 text-lg flex-shrink-0">⏰</span>
                    <div className="flex justify-between w-full items-center gap-2">
                        <div className="text-xs text-gray-500">Time</div>
                        <div className="text-xs font-medium">
                            {medicationData.medicationInformation.nextAdministration || 'As required'}
                        </div>
                    </div>
                </div>

                {/* Note - for Regular Medication */}
                {medicationData.type === "medication" && medicationData.note && (
                    <div className="border border-gray-300 rounded-lg p-4 bg-white flex items-center gap-3">
                        <div className="text-gray-400 text-xl flex-shrink-0">📋</div>
                        <div className="flex justify-between w-full items-center">
                            <div className="text-xs text-gray-500">Note</div>
                            <div className="text-xs font-medium text-gray-800 text-right">
                                {medicationData.note}
                            </div>
                        </div>
                    </div>
                )}



                {/* PRN Note - for PRN Medication */}
                {medicationData.type === "prn" && medicationData.prnNote && (
                    <div className="border border-gray-300 rounded-lg p-4 bg-white flex items-center gap-3">
                        <div className="text-gray-400 text-xl flex-shrink-0">📝</div>
                        <div className="flex justify-between w-full items-center gap-2">
                            <div className="text-xs text-gray-500">PRN Note</div>
                            <div className="text-xs font-medium text-gray-800 text-right">
                                {medicationData.prnNote}
                            </div>
                        </div>
                    </div>
                )}

                {/* Allergies Alert */}
                <div className="border border-gray-300 rounded-lg p-4 bg-white flex items-center gap-3">
                    <div className="text-yellow-500 text-xl flex-shrink-0">⚠️</div>
                    <div className="flex justify-between w-full items-center gap-2">
                        <div className="text-xs text-gray-500">Allergies</div>
                        <div className="text-xs font-medium text-yellow-700 text-right">
                            {medicationData.alerts.participantAllergic}
                        </div>
                    </div>
                </div>

                {/* Emergency Steps */}
                <div className="border border-gray-300 rounded-lg p-4 bg-white flex items-center gap-3">
                    <div className="text-red-500 text-xl flex-shrink-0">🚨</div>
                    <div className="flex justify-between w-full items-center gap-2">
                        <div className="text-xs text-gray-500">Emergency Steps</div>
                        <div className="text-xs font-medium text-red-700 text-right whitespace-pre-wrap">
                            {medicationData.alerts.adverseEffectsSteps}
                        </div>
                    </div>
                </div>


                {/* Storage Information */}
                <div className="border border-gray-300 rounded-lg p-4 bg-white flex items-center gap-3">
                    <div className="text-gray-400 text-xl flex-shrink-0">🔒</div>
                    <div className="flex justify-between w-full items-center gap-2">
                        <div className="text-xs text-gray-500">Storage Information</div>
                        <div className="text-xs font-medium text-gray-800 text-right">
                            {medicationData.storageInformation}
                        </div>
                    </div>
                </div>

                {/* Emergency Contact */}
                <div className="border border-gray-300 rounded-lg p-4 bg-white flex items-center gap-3">
                    <div className="text-gray-400 text-xl flex-shrink-0">👤</div>
                    <div className="flex justify-between w-full items-center gap-2">
                        <div className="text-xs text-gray-500">Emergency Contact</div>
                        <div className="text-xs font-medium text-gray-800 text-right space-y-0.5">
                            <div>{medicationData.emergencyContact.name}</div>
                            <div className="text-gray-500">{medicationData.emergencyContact.relation}</div>
                            <div>{medicationData.emergencyContact.phone}</div>
                            <div>{medicationData.emergencyContact.email}</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}


window.Medication = Medication;