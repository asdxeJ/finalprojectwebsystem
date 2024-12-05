using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Menu
{
    public class CreateMenuDTO
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Category { get; set; } = string.Empty;
        [Required]
        [Range(1, 1000)]
        public decimal Price { get; set; }
        [Required]
        [MinLength(10, ErrorMessage = "Description must be atleast 10 characters")]
        [MaxLength(30, ErrorMessage = "Description cannot be over 30 characters")]
        public string Description { get; set; } = string.Empty;
        [Required]
        public IFormFile Image { get; set; }
    }
}