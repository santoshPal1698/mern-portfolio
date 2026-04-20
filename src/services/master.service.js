export const formatDateTime = (dateValue) => {
    const dateObj = new Date(dateValue);

    const formattedDate = dateObj.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const formattedTime = dateObj.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return { formattedDate, formattedTime };
};

export const whatsappMsg = (data) => {
    // console.log('whats app msg',data)
    const { formattedDate, formattedTime } = formatDateTime(data.date);
    return `
    Hello Dheeraj ji,
    My name is ${data.name} .
    Mobile Number is: ${data.phone}).
    I would like to inquire about the  ${data.destination ? `visit ${data.destination}` : "travel with you"}.
    Travel Date: ${formattedDate}  
    Preferred Time: ${formattedTime}
    message: ${data.message || "No additional message provided."}

    Please share the itinerary, pricing, and availability.
    Looking forward to your response.

    Thank You,  
    ${data.name}`;
};