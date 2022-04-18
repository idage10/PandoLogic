using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace JobTitlesData.Models
{
    public partial class TestJobs
    {
        public int JobId { get; set; }
        public int JobTitleId { get; set; }
        public int CategoryId { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int? DescriptionLength { get; set; }
        public int? EducationLevel { get; set; }
        public int Clicks { get; set; }
        public int Applicants { get; set; }
    }
}
