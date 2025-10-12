function Medication({ medicationId, participantId }) {
    const [showModal, setShowModal] = React.useState(false);
    const [modalType, setModalType] = React.useState(null); // 'administer', 'refused', 'notAdministered'
    const [observationNotes, setObservationNotes] = React.useState('');
    const [refusalReason, setRefusalReason] = React.useState('');
    const [notAdministeredReason, setNotAdministeredReason] = React.useState('');
    const [signatureCanvas, setSignatureCanvas] = React.useState(null);
    const [signatureBase64, setSignatureBase64] = React.useState('');
    const [completedSteps, setCompletedSteps] = React.useState([]);
    const [stepsConfirmed, setStepsConfirmed] = React.useState(false);
    const canvasRef = React.useRef(null);
    const [isDrawing, setIsDrawing] = React.useState(false);

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

    // Initialize canvas
    React.useEffect(() => {
        if (showModal && (modalType === 'administer') && canvasRef.current) {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            setSignatureCanvas(canvas.getContext('2d'));
        }
    }, [showModal, modalType]);

    // Canvas drawing functions
    const startDrawing = (e) => {
        setIsDrawing(true);
        const rect = canvasRef.current.getBoundingClientRect();
        const ctx = signatureCanvas;
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    const draw = (e) => {
        if (!isDrawing || !signatureCanvas) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const ctx = signatureCanvas;
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        if (signatureCanvas) {
            signatureCanvas.closePath();
        }
    };

    const clearCanvas = () => {
        if (signatureCanvas && canvasRef.current) {
            signatureCanvas.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            setSignatureBase64('');
        }
    };

    const saveSignature = () => {
        if (canvasRef.current) {
            const base64 = canvasRef.current.toDataURL('image/png');
            setSignatureBase64(base64);
        }
    };

    // Handle Administer button click
    const handleAdminister = () => {
        setModalType('administer');
        setShowModal(true);
        setCompletedSteps([]);
        setObservationNotes('');
        setSignatureBase64('');
    };

    // Handle Refused button click
    const handleRefused = () => {
        setModalType('refused');
        setShowModal(true);
        setRefusalReason('');
    };

    // Handle Not Administered button click
    const handleNotAdministered = () => {
        setModalType('notAdministered');
        setShowModal(true);
        setNotAdministeredReason('');
    };

    // Toggle step completion
    const toggleStep = (stepId) => {
        setCompletedSteps((prev) =>
            prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
        );
    };

    // Check if all steps are completed
    const allStepsCompleted = medicationData.prnSteps && medicationData.prnSteps.length > 0 &&
        medicationData.prnSteps.every((step) => completedSteps.includes(step._id));

    // Handle confirming all PRN steps
    const handleConfirmSteps = () => {
        if (allStepsCompleted) {
            setStepsConfirmed(true);
        }
    };

    // Handle modal complete/submit
    const handleModalComplete = () => {
        if (modalType === 'administer') {
            if (medicationData.type === 'prn' && !stepsConfirmed) {
                alert('Please complete all PRN steps and confirm');
                return;
            }

            if (!signatureBase64) {
                alert('Signature is mandatory');
                return;
            }

            const payload = {
                medicationId,
                type: 'administer',
                medicationType: medicationData.type,
                observationNotes: observationNotes || null,
                signature: signatureBase64,
                completedSteps: medicationData.type === 'prn' ? completedSteps : [],
            };

            console.log('Administer Payload:', payload);
            // API call (commented out)
            // await fetch(`${API_BASE}/medication-administration`, {
            //     method: 'POST',
            //     headers: authHeaders,
            //     body: JSON.stringify(payload)
            // });
        } else if (modalType === 'refused') {
            if (!refusalReason.trim()) {
                alert('Reason for refusal is mandatory');
                return;
            }

            const payload = {
                medicationId,
                type: 'refused',
                refusalReason: refusalReason.trim(),
            };

            console.log('Refused Payload:', payload);
            // API call (commented out)
            // await fetch(`${API_BASE}/medication-administration`, {
            //     method: 'POST',
            //     headers: authHeaders,
            //     body: JSON.stringify(payload)
            // });
        } else if (modalType === 'notAdministered') {
            if (!notAdministeredReason.trim()) {
                alert('Reason for not administering is mandatory');
                return;
            }

            const payload = {
                medicationId,
                type: 'notAdministered',
                notAdministeredReason: notAdministeredReason.trim(),
            };

            console.log('Not Administered Payload:', payload);
            // API call (commented out)
            // await fetch(`${API_BASE}/medication-administration`, {
            //     method: 'POST',
            //     headers: authHeaders,
            //     body: JSON.stringify(payload)
            // });
        }

        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setObservationNotes('');
        setRefusalReason('');
        setNotAdministeredReason('');
        setSignatureBase64('');
        setCompletedSteps([]);
        setStepsConfirmed(false);
        clearCanvas();
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                        {/* Administer Modal */}
                        {modalType === 'administer' && (
                            <div className="p-6">
                                <h2 className="text-lg font-bold mb-4">Administer Medication</h2>

                                {/* PRN Steps */}
                                {medicationData.type === 'prn' && medicationData.prnSteps && !stepsConfirmed && (
                                    <div className="mb-6">
                                        <h3 className="text-sm font-semibold mb-3">PRN Steps (All required)</h3>
                                        <div className="space-y-2">
                                            {medicationData.prnSteps.map((step) => (
                                                <label key={step._id} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={completedSteps.includes(step._id)}
                                                        onChange={() => toggleStep(step._id)}
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm text-gray-700">{step.step}</span>
                                                </label>
                                            ))}
                                        </div>
                                        <button
                                            onClick={handleConfirmSteps}
                                            disabled={!allStepsCompleted}
                                            className={`mt-4 w-full px-4 py-2 text-white text-sm font-medium rounded transition ${allStepsCompleted
                                                ? 'bg-blue-600 hover:bg-blue-700'
                                                : 'bg-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            Administer
                                        </button>
                                    </div>
                                )}

                                {/* Observation Notes and Signature - Show only after steps confirmed or for regular medication */}
                                {(stepsConfirmed || medicationData.type === 'medication') && (
                                    <>
                                        {/* Observation Notes */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Observation Notes (Optional)
                                            </label>
                                            <textarea
                                                value={observationNotes}
                                                onChange={(e) => setObservationNotes(e.target.value)}
                                                placeholder="Enter observation notes..."
                                                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rows="4"
                                            />
                                        </div>

                                        {/* Signature Canvas */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Signature (Mandatory)
                                            </label>
                                            <div className="border-2 border-gray-300 rounded bg-gray-50">
                                                <canvas
                                                    ref={canvasRef}
                                                    onMouseDown={startDrawing}
                                                    onMouseMove={draw}
                                                    onMouseUp={stopDrawing}
                                                    onMouseLeave={stopDrawing}
                                                    className="w-full h-32 cursor-crosshair"
                                                />
                                            </div>
                                            <button
                                                onClick={clearCanvas}
                                                className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                                            >
                                                Clear Signature
                                            </button>
                                            {signatureBase64 && <p className="text-xs text-green-600 mt-1">✓ Signature saved</p>}
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleModalComplete}
                                                className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                                            >
                                                Complete
                                            </button>
                                            <button
                                                onClick={handleCloseModal}
                                                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 text-sm font-medium rounded hover:bg-gray-400 transition"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Refused Modal */}
                        {modalType === 'refused' && (
                            <div className="p-6">
                                <h2 className="text-lg font-bold mb-4">Medication Refused</h2>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Reason for Refusal (Mandatory)
                                    </label>
                                    <textarea
                                        value={refusalReason}
                                        onChange={(e) => setRefusalReason(e.target.value)}
                                        placeholder="Enter reason for refusal..."
                                        className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                        rows="4"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={handleModalComplete}
                                        className="flex-1 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition"
                                    >
                                        Complete
                                    </button>
                                    <button
                                        onClick={handleCloseModal}
                                        className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 text-sm font-medium rounded hover:bg-gray-400 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Not Administered Modal */}
                        {modalType === 'notAdministered' && (
                            <div className="p-6">
                                <h2 className="text-lg font-bold mb-4">Not Administered</h2>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Reason for Not Administering (Mandatory)
                                    </label>
                                    <textarea
                                        value={notAdministeredReason}
                                        onChange={(e) => setNotAdministeredReason(e.target.value)}
                                        placeholder="Enter reason..."
                                        className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        rows="4"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={handleModalComplete}
                                        className="flex-1 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 transition"
                                    >
                                        Complete
                                    </button>
                                    <button
                                        onClick={handleCloseModal}
                                        className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 text-sm font-medium rounded hover:bg-gray-400 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

window.Medication = Medication;