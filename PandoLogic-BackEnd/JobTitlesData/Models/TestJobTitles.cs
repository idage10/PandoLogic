using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace JobTitlesData.Models
{
    public partial class TestJobTitles
    {
        public int JobTitleId { get; set; }
        public string JobTitleName { get; set; }
        public int CategoryId { get; set; }
    }
}
